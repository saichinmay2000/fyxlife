import { useState } from "react";
import { View, Text, TextInput, Pressable, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { useStore } from "../../lib/store";
import type { ActivityLevel, Profile } from "../../lib/types";

export default function UserInfo() {
    const router = useRouter();
    const setProfile = useStore(s => s.setProfile);
    const [name, setName] = useState("");
    const [age, setAge] = useState("30");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState<Profile["gender"]>("male");
    const [activity, setActivity] = useState<ActivityLevel>("medium");

    const next = () => {
        setProfile({ name, age: Number(age), phone, gender, activity });
        router.push("/onboarding/done");
    };

    return (
        <SafeAreaView>
            <View style={{ padding: 20, gap: 12 }}>
                <Text style={{ fontSize: 22, fontWeight: "600" }}>Your details</Text>
                <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
                <TextInput placeholder="Age" keyboardType="number-pad" value={age} onChangeText={setAge} style={styles.input} />
                <TextInput placeholder="Phone" keyboardType="phone-pad" value={phone} onChangeText={setPhone} style={styles.input} />
                <TextInput placeholder="Gender (male/female/other)" value={gender} onChangeText={t => setGender(t as any)} style={styles.input} />
                <TextInput placeholder="Activity (low/moderate/high)" value={activity} onChangeText={t => setActivity(t as any)} style={styles.input} />
                <Pressable onPress={next} style={styles.cta}><Text style={{ color: "white", textAlign: "center" }}>Continue</Text></Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = {
    input: { borderWidth: 1, borderColor: "#ddd", padding: 12, borderRadius: 10 },
    cta: { backgroundColor: "#0071E7", padding: 14, borderRadius: 12, marginTop: 8 },
};
