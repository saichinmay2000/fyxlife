import { View, Text, FlatList, Modal, Pressable, SafeAreaView } from "react-native";
import { useStore, goalReplacements } from "../../lib/store";
import { todayKey } from "../../lib/utils";
import GoalCard from "../../components/GoalCard";
import { useMemo, useState } from "react";
import type { Goal } from "../../lib/types";

export default function Dashboard() {
    const goals = useStore(s => s.goals);
    const logs = useStore(s => s.logs);
    const addProgress = useStore(s => s.addProgress);
    const swapGoal = useStore(s => s.swapGoal);
    const todaySummary = useStore(s => s.todaySummary);   // ✅ subscribe to fn
    const summary = todaySummary();                       // ✅ call manually
    const [swapFor, setSwapFor] = useState<string | null>(null);

    const today = logs[todayKey()];
    const progMap = useMemo(() => {
        const m = new Map<string, number>();
        goals.forEach(g => m.set(g.id, 0));
        if (today) today.progresses.forEach(p => m.set(p.goalId, p.progress));
        return m;
    }, [goals, today]);

    const beginSwap = (goalId: string) => setSwapFor(goalId);
    const doSwap = (g: Goal) => { if (swapFor) swapGoal(swapFor, g); setSwapFor(null); };

    return (
        <SafeAreaView style={{ flex: 1, padding: 12, backgroundColor: "white" }}>
            <View style={{ flex: 1, padding: 16, gap: 14 }}>
                <Text style={{ fontSize: 22, fontWeight: "700" }}>Your goals</Text>
                <FlatList
                    data={goals}
                    keyExtractor={g => g.id}
                    renderItem={({ item }) => (
                        <GoalCard
                            goal={item}
                            progress={progMap.get(item.id) ?? 0}
                            onAdd={(d) => addProgress(item.id, d)}
                            onSwap={() => beginSwap(item.id)}
                        />
                    )}
                    ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                />
                <Text style={{ marginTop: 6 }}>
                    Completed today: {summary.completed}/{summary.total}
                </Text>

                <Modal
                    visible={!!swapFor}
                    transparent
                    animationType="slide"
                    onRequestClose={() => setSwapFor(null)}
                >
                    <View style={{ flex: 1, backgroundColor: "#0006", justifyContent: "center", padding: 20 }}>
                        <View style={{ backgroundColor: "white", borderRadius: 16, padding: 16, gap: 10 }}>
                            <Text style={{ fontWeight: "700", fontSize: 16 }}>Swap goal</Text>
                            {swapFor && goalReplacements(goals.find(g => g.id === swapFor)!.type).map(r => (
                                <Pressable
                                    key={r.id}
                                    onPress={() => doSwap(r)}
                                    style={{ padding: 10, borderRadius: 10, borderWidth: 1, borderColor: "#eee" }}
                                >
                                    <Text>{r.title}</Text>
                                </Pressable>
                            ))}
                            <Pressable onPress={() => setSwapFor(null)} style={{ padding: 10, alignSelf: "flex-end" }}>
                                <Text>Close</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
}
