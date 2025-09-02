import { View, Text, Pressable } from "react-native";
import ProgressBar from "./ProgressBar";
import { Goal } from "../lib/types";

type Props = {
    goal: Goal;
    progress: number;
    onAdd: (delta: number) => void;
    onSwap: () => void;
};

export default function GoalCard({ goal, progress, onAdd, onSwap }: Props) {
    const complete = progress >= goal.target;
    return (
        <View style={{ padding: 14, borderRadius: 14, backgroundColor: "white", gap: 10, elevation: 2 }}>
            <Text style={{ fontSize: 16, fontWeight: "600" }}>{goal.title}</Text>
            <ProgressBar value={progress} max={goal.target} />
            <Text>{progress}/{goal.target} {goal.unit}</Text>
            <View style={{ flexDirection: "row", gap: 8 }}>
                <Pressable onPress={() => onAdd(goal.unit === "min" ? 5 : 1)} style={btn}>
                    <Text style={{ color: "white" }}>+ {goal.unit === "min" ? "5" : "1"}</Text>
                </Pressable>
                <Pressable onPress={onSwap} style={[btn, { backgroundColor: "#8e8e93" }]}>
                    <Text style={{ color: "white" }}>Swap</Text>
                </Pressable>
                {complete && <Text style={{ marginLeft: 6 }}>✅</Text>}
            </View>
        </View>
    );
}
const btn = { backgroundColor: "#0071E7", paddingVertical: 10, paddingHorizontal: 14, borderRadius: 10 };
