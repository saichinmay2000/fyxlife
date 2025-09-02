import { View, Text } from "react-native";
import { useStore } from "../../lib/store";

type Risk = { label: string; system: "Cardio" | "Metabolic" | "Musculoskeletal" | "Neuro"; score: number };

const computeRisks = (): Risk[] => {
    // simple static-ish baseline; you can tweak with profile/activity if desired
    return [
        { label: "Heart disease", system: "Cardio", score: 35 },
        { label: "Early-onset diabetes", system: "Metabolic", score: 40 },
        { label: "Osteoarthritis", system: "Musculoskeletal", score: 30 },
        { label: "Stress/anxiety", system: "Neuro", score: 45 },
    ];
};

const Bar = ({ score }: { score: number }) => (
    <View style={{ height: 10, backgroundColor: "#eee", borderRadius: 6 }}>
        <View style={{ width: `${score}%`, height: 10, borderRadius: 6, backgroundColor: score > 60 ? "#ff3b30" : score > 40 ? "#ff9f0a" : "#34c759" }} />
    </View>
);

export default function Risk() {
    const profile = useStore(s => s.profile);
    const risks = computeRisks();

    return (
        <View style={{ flex: 1, padding: 16, gap: 12 }}>
            <Text style={{ fontSize: 22, fontWeight: "700" }}>Risk-o-meter ⚠️</Text>
            <Text style={{ color: "#666" }}>Assuming a moderately healthy {profile?.age ?? 30}s user.</Text>
            {["Cardio", "Metabolic", "Musculoskeletal", "Neuro"].map(sys => (
                <View key={sys} style={{ backgroundColor: "white", borderRadius: 14, padding: 14, gap: 8, elevation: 2 }}>
                    <Text style={{ fontWeight: "600" }}>{sys}</Text>
                    {risks.filter(r => r.system === sys).map(r => (
                        <View key={r.label} style={{ gap: 6 }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Text>{r.label}</Text><Text>{r.score}/100</Text>
                            </View>
                            <Bar score={r.score} />
                        </View>
                    ))}
                </View>
            ))}
            <Text style={{ fontSize: 12, color: "#888", marginTop: 8 }}>
                This is a non-medical, illustrative snapshot — not diagnostic advice.
            </Text>
        </View>
    );
}
