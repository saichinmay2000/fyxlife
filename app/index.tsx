import { Redirect } from "expo-router";
import { useStore } from "../lib/store";

export default function Index() {
    const onboarded = useStore(s => s.onboarded);

    if (onboarded) {
        return <Redirect href="/(tabs)/dashboard" />;
    }
    return <Redirect href="/onboarding/welcome" />;
}
