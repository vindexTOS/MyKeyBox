import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function List() {
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
