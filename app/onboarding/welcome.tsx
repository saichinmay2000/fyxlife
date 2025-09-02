import { Link } from "expo-router";
import { View, Text, Pressable } from "react-native";

export default function Welcome() {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 24 }}>
            <Text style={{ fontSize: 28, fontWeight: "700", marginBottom: 16 }}>Welcome to Fyxlife 🌱</Text>
            <Link href="/onboarding/user-info" asChild>
                <Pressable style={{ backgroundColor: "#0071E7", padding: 14, borderRadius: 12 }}>
                    <Text style={{ color: "white", fontSize: 16 }}>Get Started</Text>
                </Pressable>
            </Link>
        </View>
    );
}
