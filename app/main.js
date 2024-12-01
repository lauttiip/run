import { View, Text } from "react-native-web";
import ActivityCard from "../components/ActivityCard";
import { useEffect, useState } from "react";
import { useRouter } from 'expo-router';
import { useSearchParams } from "expo-router/build/hooks";
import { useGlobalSearchParams } from 'expo-router';
import { useLocalSearchParams } from "expo-router/build/hooks";

export default function main() {
    const listaActividades = "https://www.strava.com/api/v3/athlete/activities?per_page=10";

    const router = useRouter()
    const [activities, setActivities] = useState([]);
    const data = useLocalSearchParams();

    useEffect(() => {
        console.log(data.accessToken)
          fetch(listaActividades, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${data.accessToken}`
            },
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error('Error al intercambiar el código por el token');
              }
              return response.json();
            })
            .then((data) => {
                setActivities(data);
                console.log(data) // Guarda las actividades en el estado
              })
            .catch((error) => {
              console.error('Error:', error);
            });
        }
      , []);


      return (
        <View>
          {activities.map((activity) => (
            <ActivityCard key={activity.name} activity={activity}  />
          ))}
        </View>
      );
      

}
