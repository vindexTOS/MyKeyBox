import { View, Text } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function () {
  const navigation: any = useNavigation();

  return (
    <View>
      {/* <Text onPress={() => navigation.navigate(`Registration`)}>Regist</Text>
      <Text onPress={() => navigation.navigate(`Login`)}>Login</Text> */}
    </View>
  );
}
