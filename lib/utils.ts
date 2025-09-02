import { format, subDays, isSameDay, parseISO } from "date-fns";

export const todayKey = () => format(new Date(), "yyyy-MM-dd");

export const consecutiveStreak = (days: string[], completedPredicate: (day: string) => boolean) => {
    let streak = 0;
    for (let i = 0; i < 365; i++) {
        const d = format(subDays(new Date(), i), "yyyy-MM-dd");
        if (!days.includes(d) || !completedPredicate(d)) break;
        streak++;
    }
    return streak;
};

export const isSameYMD = (a: string, b: string) =>
    isSameDay(parseISO(a), parseISO(b));
