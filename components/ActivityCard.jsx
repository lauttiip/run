import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Card } from 'react-native-elements';

const ActivityCard = ({ activity }) => {
  const {
    name,
    distance,
    moving_time,
    average_speed,
    max_speed,
    total_elevation_gain,
    sport_type,
    start_date_local,
    calories,
    photos,
  } = activity;

  const formattedTime = new Date(moving_time * 1000).toISOString().substr(11, 8); // HH:mm:ss
  const formattedDate = new Date(start_date_local).toLocaleDateString(); // Formato amigable

  return (
    <Card containerStyle={styles.card}>
      <Card.Title>{name || 'Actividad'}</Card.Title>
      <Card.Divider />
      {/* Foto principal */}
      
      {/* Detalles */}
      <View style={styles.details}>
        <Text style={styles.detailText}>📅 Fecha: {formattedDate}</Text>
        <Text style={styles.detailText}>🏃‍♂️ Tipo: {sport_type || 'N/A'}</Text>
        <Text style={styles.detailText}>
          📏 Distancia: {distance ? (distance / 1000).toFixed(2) : 'N/A'} km
        </Text>
        <Text style={styles.detailText}>⏱️ Tiempo: {formattedTime}</Text>
        <Text style={styles.detailText}>
          ⚡ Vel. Prom: {average_speed ? average_speed.toFixed(2) : 'N/A'} m/s
        </Text>
        <Text style={styles.detailText}>
          🚀 Vel. Máx: {max_speed ? max_speed.toFixed(2) : 'N/A'} m/s
        </Text>
        <Text style={styles.detailText}>
          ⛰️ Elevación: {total_elevation_gain || 'N/A'} m
        </Text>
        <Text style={styles.detailText}>
          🔥 Calorías: {calories ? calories.toFixed(1) : 'N/A'}
        </Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 16,
    backgroundColor: '#f8f9fa',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  details: {
    marginTop: 8,
  },
  detailText: {
    fontSize: 14,
    marginVertical: 4,
    color: '#333',
  },
});

export default ActivityCard;
