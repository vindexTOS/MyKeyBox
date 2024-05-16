import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../Screens/Home/Home";
import React from "react";
import Registration from "../Screens/Registration/Registration";
import Login from "../Screens/Login/Login";
import User from "../Screens/User/User";
import { UseUserContext } from "../Context/UserContext";

export default function RootNavigation({ children }: any) {
  const Stack = createNativeStackNavigator();
  const { state } = UseUserContext();
  const { decodedUser } = state;
  return (
    <Stack.Navigator>
      {!decodedUser.userId ? (
        <>
          <Stack.Screen
            name="Registration"
            component={Registration}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="User"
            component={User}
            options={{
              headerShown: false,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
