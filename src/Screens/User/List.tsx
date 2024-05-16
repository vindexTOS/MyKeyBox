import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { GetBoxesRequest } from "../../API/Getlist";
import { useQuery } from "@tanstack/react-query";
export default function List() {
  // const query = useQuery({
  //   queryKey: ["box-list"],
  //   queryFn: GetBoxesRequest,
  // });

  return (
    <View style={style.mainContainer}>
      <Text style={style.header}>My list</Text>
    </View>
  );
}

const style = StyleSheet.create({
  mainContainer: {},
  header: {},
});
