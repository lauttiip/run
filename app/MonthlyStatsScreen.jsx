import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useQuery } from "react-query";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaInsetsContext } from "react-native-safe-area-context";
import { color } from "react-native-elements/dist/helpers";

const fetchActivities = async (accessToken) => {
  const response = await fetch(
    "https://www.strava.com/api/v3/athlete/activities?per_page=100",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  if (!response.ok) throw new Error("Error fetching activities");
  return response.json();
};
const { month, year } = useLocalSearchParams();
const calculateMonthlyStats = (activities = []) => {
  const stats = {};

  activities.forEach((activity) => {
    const month = new Date(activity.start_date_local).getMonth();
    const year = new Date(activity.start_date_local).getFullYear();
    const key = `${year}-${month + 1}`;

    if (!stats[key]) {
      stats[key] = {
        distance: 0,
        time: 0,
        elevation: 0,
        count: 0,
      };
    }

    stats[key].distance += activity.distance || 0;
    stats[key].time += activity.moving_time || 0;
    stats[key].elevation += activity.total_elevation_gain || 0;
    stats[key].count += 1;
  });

  return Object.entries(stats).slice(-3);
};
export default function MonthlyStatsScreen({ route }) {
  const { accessToken } = useLocalSearchParams();
  const router = useRouter();
  const data = useLocalSearchParams();

  const {
    data: activities,
    isLoading,
    error,
  } = useQuery(
    ["activities", accessToken],
    () => fetchActivities(accessToken),
    { enabled: !!accessToken }
  );

  if (isLoading) return <Text>Cargando...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  if (!Array.isArray(activities))
    return <Text>No hay actividades disponibles.</Text>;

  const monthlyStats = calculateMonthlyStats(activities);
  console.log("Activities data:", activities);
  return (
    <SafeAreaInsetsContext.Consumer>
      {(insets) => (
        <View style={[styles.container, { paddingTop: insets?.top }]}>
          <Text style={styles.title}>Estadísticas Mensuales</Text>
          <FlatList
            data={monthlyStats}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              const [monthKey, stats] = item;
              const [year, month] = monthKey.split("-");
              const monthName = new Date(year, month - 1).toLocaleString(
                "default",
                { month: "long" }
              );

              return (
                <>
                  <TouchableOpacity
                    onPress={() =>
                      router.push({
                        pathname: "/main",
                        params: { accessToken },
                      })
                    }
                  >
                    <Text
                      style={{ color: "blue", fontSize: 15, marginBottom: 20 }}
                    >
                      Volver al inicio
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.statCard}>
                    <Text
                      style={styles.cardTitle}
                    >{`${monthName} ${year}`}</Text>
                    <Text style={styles.cardText}>
                      Distancia total: {(stats.distance / 1000).toFixed(2)} km
                    </Text>
                    <Text style={styles.cardText}>
                      Tiempo total: {(stats.time / 3600).toFixed(2)} horas
                    </Text>
                    <Text style={styles.cardText}>
                      Ganancia de elevación: {stats.elevation.toFixed(2)} m
                    </Text>
                  </View>
                </>
              );
            }}
          />
        </View>
      )}
    </SafeAreaInsetsContext.Consumer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ee8600",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffeace",
    marginVertical: 16,
    textAlign: "center",
  },
  statCard: {
    backgroundColor: "#ffeace",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    marginBottom: 4,
  },
});
