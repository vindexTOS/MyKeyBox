import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../Screens/Home/Home";
import React from "react";
import Registration from "../Screens/Registration/Registration";

export default function RootNavigation({ children }: any) {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Registration"
        component={Registration}
        options={{
          headerStyle: {
            backgroundColor: "#ffffff",
          },
        }}
      />
    </Stack.Navigator>
  );
}
