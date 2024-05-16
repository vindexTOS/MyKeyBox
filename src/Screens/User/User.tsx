import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { UseUserContext } from "../../Context/UserContext";
import UserNav from "./UserNav";
import List from "./List";
export default function User() {
  const { logout, state } = UseUserContext();
  // TO DO LATER make switch statment navigation if there is any other component for users
  return (
    <View>
      <UserNav />
      <List />
      {/* <Text onPress={logout}>LogOut</Text> */}
    </View>
  );
}
