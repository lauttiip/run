import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { Card } from "react-native-elements";
const ActivityCard = ({ activity }) => {
  const {
    name,
    distance,
    moving_time,
    average_speed,
    sport_type,
    start_date_local,
  } = activity;
  const formattedTime = new Date(moving_time * 1000)
    .toISOString()
    .substr(11, 8); 
  const formattedDate = new Date(start_date_local).toLocaleDateString(); 

  return (
    <Card containerStyle={styles.card}>
      <Card.Title>{name || "Actividad"}</Card.Title>
      <Card.Divider />
      <View style={styles.details}>
        <Text style={styles.detailText}>📅 Fecha: {formattedDate}</Text>
        <Text style={styles.detailText}>🏃‍♂️ Tipo: {sport_type || "N/A"}</Text>
        <Text style={styles.detailText}>
          📏 Distancia: {distance ? (distance / 1000).toFixed(2) : "N/A"} km
        </Text>
        <Text style={styles.detailText}>⏱️ Tiempo: {formattedTime}</Text>
        <Text style={styles.detailText}>
          ⚡ Vel. Prom: {average_speed ? average_speed.toFixed(2) : "N/A"} m/s
        </Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 16,
    backgroundColor: "#f8f9fa",
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  details: {
    marginTop: 8,
  },
  detailText: {
    marginVertical: 4,
    color: "#333",
  },
});

export default ActivityCard;
