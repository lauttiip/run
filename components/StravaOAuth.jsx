import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  Image,
} from "react-native";
import { useAuthRequest } from "expo-auth-session";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { Logo } from "./Logo";



WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: "https://www.strava.com/oauth/authorize",
  tokenEndpoint: "https://www.strava.com/oauth/token",
};

export default function StravaOAuth() {
  const [accessToken, setAccessToken] = useState(null);

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: process.env.EXPO_PUBLIC_STRAVA_CLIENT_ID,
      scopes: ["activity:read_all"],
      redirectUri: "http://localhost:8081",
      responseType: "code",
    },
    discovery
  );

  const router = useRouter();

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      fetch("https://www.strava.com/oauth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: process.env.EXPO_PUBLIC_STRAVA_CLIENT_ID,
          client_secret: process.env.EXPO_PUBLIC_STRAVA_CLIENT_SECRET,
          code: code,
          redirect_uri: process.env.EXPO_PUBLIC_STRAVA_REDIRECT_URI,
          grant_type: "authorization_code",
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al intercambiar el código por el token");
          }
          return response.json();
        })
        .then((data) => {
          setAccessToken(data.access_token);
          router.push({
            pathname: "/main",
            params: { accessToken: data.access_token },
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Bienvenido a Strava</Text>
      </View>
      <TouchableHighlight
        style={styles.button}
        disabled={!request}
        onPress={() => promptAsync()}
      >
        <View style={styles.buttonContent}>
          <Logo style={styles.logo} />
          <Text style={styles.buttonText}>Acceder con Strava</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ee8600",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#ffeace",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#ffeace",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "black",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#413f3f",
    fontWeight: "700",
    textTransform: "uppercase",
  },
  logo: {
    width: 34,
    height: 34,
    marginRight: 10,
  },
});
