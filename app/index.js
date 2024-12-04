import React from "react";
import { View, StyleSheet } from "react-native";
import StravaOAuth from "../components/StravaOAuth";

export default function Index() {

  return (
    <View style={styles.container}>
      <StravaOAuth />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ee8600",
  },
});
