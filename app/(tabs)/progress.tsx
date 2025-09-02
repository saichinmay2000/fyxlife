import { View, Text } from "react-native";
import { useStore } from "../../lib/store";
import { consecutiveStreak, todayKey } from "../../lib/utils";

export default function Progress() {
    const todaySummary = useStore(s => s.todaySummary);
    const periodSummary = useStore(s => s.periodSummary);
    const logs = useStore(s => s.logs);
    const isDayCompleted = useStore(s => s.isDayCompleted);

    const today = todaySummary();
    const week = periodSummary("week");
    const month = periodSummary("month");

    const days = Object.keys(logs).sort().reverse(); // yyyy-MM-dd
    const streak = consecutiveStreak(days, isDayCompleted);

    const Row = ({ label, done, total }: { label: string; done: number; total: number }) => (
        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 8 }}>
            <Text>{label}</Text><Text>{done}/{total}</Text>
        </View>
    );

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <Text style={{ fontSize: 22, fontWeight: "700" }}>Summary</Text>
            <Row label="Today" done={today.completed} total={today.total} />
            <Row label="This week" done={week.completed} total={week.total} />
            <Row label="This month" done={month.completed} total={month.total} />
            <View style={{ marginTop: 16 }}>
                <Text style={{ fontSize: 16 }}>🔥 Streak: {streak} day(s)</Text>
            </View>
        </View>
    );
}
