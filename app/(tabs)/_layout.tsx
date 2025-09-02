import { Tabs } from "expo-router";

export default function TabsLayout() {
    return (
        <Tabs screenOptions={{ headerTitleAlign: "center" }}>
            <Tabs.Screen name="dashboard" options={{ title: "Dashboard" }} />
            <Tabs.Screen name="progress" options={{ title: "Progress" }} />
            <Tabs.Screen name="risk" options={{ title: "Risk-o-meter" }} />
        </Tabs>
    );
}
