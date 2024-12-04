import { SafeAreaView, StyleSheet } from "react-native";
import { Slot } from "expo-router";
import { QueryClient, QueryClientProvider } from "react-query";


const queryClient = new QueryClient();

export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={styles.container}>
        <Slot />
      </SafeAreaView>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ee8600",
  },
});
