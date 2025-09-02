import { View } from "react-native";
export default function ProgressBar({ value, max }: { value: number; max: number }) {
    const pct = Math.min(100, Math.round((value / Math.max(1, max)) * 100));
    return (
        <View style={{ height: 10, backgroundColor: "#eee", borderRadius: 6 }}>
            <View style={{ width: `${pct}%`, height: 10, borderRadius: 6, backgroundColor: "#34c759" }} />
        </View>
    );
}
