import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import { useAuthRequest } from 'expo-auth-session';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: 'https://www.strava.com/oauth/authorize',
  tokenEndpoint: 'https://www.strava.com/oauth/token',
};

export default function StravaOAuth() {
  const [accessToken, setAccessToken] = useState(null);
  
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: '141493',
      scopes: ['activity:read_all'],
      redirectUri: "http://localhost:8082",
      responseType: 'code',
    },
    discovery
  );

  const router = useRouter(); // Hook para manejar rutas

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      fetch('https://www.strava.com/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: '141493',
          client_secret: '7f435bdc459319d6ce88cda4465803e496ab4b8c',
          code: code,
          redirect_uri: 'http://localhost:8082',
          grant_type: 'authorization_code',
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error al intercambiar el código por el token');
          }
          return response.json();
        })
        .then((data) => {
          setAccessToken(data.access_token);
          router.push({ pathname: '/main', params: { accessToken: data.access_token } });
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Button
        title="Login with Strava"
        disabled={!request}
        onPress={() => promptAsync()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
