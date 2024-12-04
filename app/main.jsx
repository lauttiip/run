import { View, Text, ScrollView, TouchableHighlight } from "react-native";
import ActivityCard from "../components/ActivityCard";
import { useEffect, useState } from "react";
import { useRouter, Link } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import {
  SafeAreaInsetsContext,
  useSafeAreaInsets,
  SafeAreaProvider,
} from "react-native-safe-area-context";

export default function main() {
  const listaActividades =
    "https://www.strava.com/api/v3/athlete/activities?per_page=10";
  const insets = useSafeAreaInsets();

  const router = useRouter();
  const [activities, setActivities] = useState([]);
  const data = useLocalSearchParams();

  useEffect(() => {
    fetch(listaActividades, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.accessToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al intercambiar el código por el token");
        }
        return response.json();
      })
      .then((data) => {
        setActivities(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <View
      style={{ flex: 1, paddingBottom: insets.bottom, paddingTop: insets.top }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Link
          href={{
            pathname: "/MonthlyStatsScreen",
            params: { accessToken: data.accessToken },
          }}
          style={{ color: "blue", marginVertical: 10 }}
        >
          Ver estadísticas Mensuales
        </Link>

        {activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </ScrollView>
    </View>
  );
}
