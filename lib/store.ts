import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Profile, Goal, DayLog, GoalType } from "./types";
import { todayKey } from "./utils";
import {
    startOfWeek,
    endOfWeek,
    isWithinInterval,
    startOfMonth,
    endOfMonth,
    parseISO,
} from "date-fns";

type State = {
    profile?: Profile;
    onboarded: boolean;
    goals: Goal[];
    logs: Record<string, DayLog>;
};

type Actions = {
    setProfile: (p: Profile) => void;
    setOnboarded: () => void;
    addProgress: (goalId: string, delta: number) => void;
    swapGoal: (oldId: string, replacement: Goal) => void;
    todaySummary: () => { completed: number; total: number };
    periodSummary: (
        period: "week" | "month"
    ) => { completed: number; total: number };
    isDayCompleted: (date: string) => boolean;
};

const defaultGoals: Goal[] = [
    { id: "move-20", type: "move", title: "20 min walk", target: 20, unit: "min" },
    { id: "eat-veg-3", type: "eat", title: "3 veggie servings", target: 3, unit: "count" },
    { id: "calm-10", type: "calm", title: "10 min meditation", target: 10, unit: "min" },
];

const replacements: Record<GoalType, Goal[]> = {
    move: [
        { id: "move-steps-4k", type: "move", title: "4k steps", target: 4000, unit: "count" },
        { id: "move-cycle-15", type: "move", title: "15 min cycling", target: 15, unit: "min" },
    ],
    eat: [
        { id: "eat-water-8", type: "eat", title: "8 glasses water", target: 8, unit: "count" },
        { id: "eat-fruit-2", type: "eat", title: "2 fruit servings", target: 2, unit: "count" },
    ],
    calm: [
        { id: "calm-breath-10", type: "calm", title: "10 mindful breaths", target: 10, unit: "count" },
        { id: "calm-journal-1", type: "calm", title: "Journal 1 page", target: 1, unit: "count" },
    ],
};

export const useStore = create<State & Actions>()(
    persist(
        (set, get) => ({
            profile: undefined,
            onboarded: false,
            goals: defaultGoals,
            logs: {},

            setProfile: (p) => set({ profile: p }),
            setOnboarded: () => set({ onboarded: true }),

            addProgress: (goalId, delta) => {
                if (delta === 0) return;

                const t = todayKey();
                const { logs, goals } = get();

                const log: DayLog =
                    logs[t] ?? { date: t, progresses: goals.map((g) => ({ goalId: g.id, progress: 0 })) };

                const idx = log.progresses.findIndex((p) => p.goalId === goalId);
                if (idx === -1) return;

                const newProgress = log.progresses[idx].progress + delta;

                // only update if something changed
                if (newProgress !== log.progresses[idx].progress) {
                    const newProg = [...log.progresses];
                    newProg[idx] = { ...newProg[idx], progress: newProgress };
                    const newLog = { ...log, progresses: newProg };

                    set({ logs: { ...logs, [t]: newLog } });
                }
            },

            swapGoal: (oldId, replacementGoal) => {
                const { goals, logs } = get();
                const nextGoals = goals.map((g) => (g.id === oldId ? replacementGoal : g));

                let goalsChanged = JSON.stringify(nextGoals) !== JSON.stringify(goals);
                let logsChanged = false;
                const t = todayKey();
                const newLogs = { ...logs };

                const log = logs[t];
                if (log) {
                    const exists = log.progresses.find((p) => p.goalId === replacementGoal.id);
                    if (!exists) {
                        const filtered = log.progresses.filter((p) => p.goalId !== oldId);
                        filtered.push({ goalId: replacementGoal.id, progress: 0 });
                        newLogs[t] = { ...log, progresses: filtered };
                        logsChanged = true;
                    }
                }

                if (goalsChanged || logsChanged) {
                    set({ goals: nextGoals, logs: newLogs });
                }
            },

            todaySummary: () => {
                const { goals, logs } = get();
                const t = todayKey();
                const log = logs[t];
                if (!log) return { completed: 0, total: goals.length };
                const completed = log.progresses.reduce((acc, p) => {
                    const g = goals.find((g) => g.id === p.goalId);
                    return acc + (g && p.progress >= g.target ? 1 : 0);
                }, 0);
                return { completed, total: goals.length };
            },

            periodSummary: (period) => {
                const { logs, goals } = get();
                const now = new Date();
                const range =
                    period === "week"
                        ? { start: startOfWeek(now), end: endOfWeek(now) }
                        : { start: startOfMonth(now), end: endOfMonth(now) };

                let completed = 0;
                let total = 0;
                Object.values(logs).forEach((d) => {
                    const dt = parseISO(d.date);
                    if (isWithinInterval(dt, range)) {
                        const dayDone = d.progresses.reduce((acc, p) => {
                            const g = goals.find((g) => g.id === p.goalId);
                            return acc + (g && p.progress >= g.target ? 1 : 0);
                        }, 0);
                        completed += dayDone;
                        total += goals.length;
                    }
                });
                return { completed, total };
            },

            isDayCompleted: (date) => {
                const { logs, goals } = get();
                const d = logs[date];
                if (!d) return false;
                const done = d.progresses.reduce((acc, p) => {
                    const g = goals.find((g) => g.id === p.goalId);
                    return acc + (g && p.progress >= g.target ? 1 : 0);
                }, 0);
                return done >= Math.ceil(goals.length * 0.67);
            },
        }),
        {
            name: "fyxlife-store",
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (s) => s,
        }
    )
);

export const goalReplacements = (type: GoalType) => replacements[type] ?? [];
