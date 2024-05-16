import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { UseUserContext } from "../../Context/UserContext";
// @ts-ignore
import Bell from "../../../assets/ICONS/bell.png";
// @ts-ignore
import UserPhoto from "../../../assets/ICONS/user.png";
export default function UserNav() {
  const { logout, state } = UseUserContext();

  return (
    <View style={styles.mainConteiner}>
      <View style={styles.mainView}>
        <View style={styles.userInfoWrapper}>
          <Image style={styles.avatar} source={UserPhoto} />
          <Text> {state.decodedUser.email}</Text>
        </View>
        <Image style={styles.bellIcon} source={Bell} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainConteiner: {
    paddingTop: 50,
    width: "100%",
    height: 120,
    elevation: 2,
  },

  mainView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userInfoWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    gap: 5,
  },
  avatar: { width: 40, height: 40 },
  bellIcon: { width: 40, height: 40, marginRight: 20 },
});
