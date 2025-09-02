import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useStore } from "../../lib/store";

export default function Done() {
    const router = useRouter();
    const name = useStore(s => s.profile?.name ?? "there");
    const setOnboarded = useStore(s => s.setOnboarded);
    const go = () => {
        setOnboarded();
        router.replace("/(tabs)/dashboard");
    };

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 24 }}>
            <Text style={{ fontSize: 24, fontWeight: "700", textAlign: "center", marginBottom: 10 }}>
                Hi {name}, your profile is ready 🎉
            </Text>
            <Pressable onPress={go} style={{ backgroundColor: "#0071E7", padding: 14, borderRadius: 12 }}>
                <Text style={{ color: "white" }}>Go to Dashboard</Text>
            </Pressable>
        </View>
    );
}
