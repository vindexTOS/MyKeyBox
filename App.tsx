import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import RootNavigation from "./src/Navigation/RootNavigation";
import TabNavigator from "./src/Navigation/TabNavigator";
import { UserContextProvider } from "./src/Context/UserContext";
const queryClient = new QueryClient();

export default function App() {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <RootNavigation />
          <TabNavigator />
        </UserContextProvider>
      </QueryClientProvider>
      {/* <ActivityIndicator /> */}
    </NavigationContainer>
  );
}
// horizontal={true}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
