import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import { UseUserContext } from "../../Context/UserContext";
// @ts-ignore
import Bell from "../../../assets/ICONS/bell.png";
// @ts-ignore
import UserPhoto from "../../../assets/ICONS/user.png";
// @ts-ignore
import Logo from "../../../assets/ICONS/logo-dark.png";
// @ts-ignore
import DropDown from "../../../assets/ICONS/downward-arrow.png";
// @ts-ignore
import UpArrow from "../../../assets/ICONS/up-arrow.png";
export default function UserNav() {
  const { logout, state, dispatch } = UseUserContext();

  const handleOutsideClick = () => {
    if (state.dropDownLogOut) {
      dispatch({
        type: "set_drop_down_log_out",
        payload: false,
      });
    }
  };

  const handlePress = () => {
    dispatch({
      type: "set_drop_down_log_out",
      payload: !state.dropDownLogOut,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsideClick}>
      <View style={styles.mainConteiner}>
        <View style={styles.mainView}>
          <Pressable
            onPress={() => handlePress()}
            style={styles.userInfoWrapper}
          >
            <Image style={styles.avatar} source={Logo} />
            <Text> {state.decodedUser.email}</Text>
            <Image
              style={styles.arrowIcon}
              source={!state.dropDownLogOut ? DropDown : UpArrow}
            />
          </Pressable>

          <Image style={styles.bellIcon} source={Bell} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  arrowIcon: {
    width: 15,
    height: 15,
    marginTop: 2,
  },
  mainConteiner: {
    paddingTop: 50,
    width: "100%",
    height: 120,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 1.51,
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
    justifyContent: "center",
    padding: 10,
    gap: 5,
  },
  avatar: { width: 40, height: 40 },
  bellIcon: { width: 40, height: 40, marginRight: 20 },
});
