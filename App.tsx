import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import RootNavigation from "./src/Navigation/RootNavigation";
import TabNavigator from "./src/Navigation/TabNavigator";
import { GeneralContextProvider } from "./src/Context/GeneralContext";
import PushNotification from "./src/PushNotifaction";
const queryClient = new QueryClient();

export default function App() {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <GeneralContextProvider>
          <RootNavigation />

          <TabNavigator />
        </GeneralContextProvider>
      </QueryClientProvider>
      {/* <ActivityIndicator /> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
