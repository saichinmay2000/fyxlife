export type ActivityLevel = "low" | "medium" | "high";

export type Profile = {
    name: string;
    age: number;
    phone: string;
    gender: "male" | "female" | "other";
    activity: ActivityLevel;
};

export type GoalType = "move" | "eat" | "calm";

export type Goal = {
    id: string;
    type: GoalType;
    title: string;
    target: number;
    unit: "min" | "count";
};

export type GoalProgress = {
    goalId: string;
    progress: number;
};

export type DayLog = {
    date: string;
    progresses: GoalProgress[];
};