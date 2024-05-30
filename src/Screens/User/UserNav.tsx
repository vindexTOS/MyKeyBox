import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import { UseGeneralContext } from "../../Context/GeneralContext";
import { UseNotification } from "../../Context/NotficationsContext";

// @ts-ignore
import Bell from "../../../assets/ICONS/bell.png";
// @ts-ignore
import UserPhoto from "../../../assets/ICONS/user.png";
// @ts-ignore
import Logo from "../../../assets/ICONS/logo-dark.png";
// @ts-ignore
import DropDown from "../../../assets/ICONS/downward-arrow.png";

import BurgerMenu from "../../Components/Menus/BurgetMenu";
import { NavigationProp, useNavigation } from "@react-navigation/native";

type RootParamList = {
  User: undefined;
};

export default function UserNav() {
  const { state, dispatch } = UseGeneralContext();
  const { notificationState } = UseNotification();

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

  const GoToNotifications = () => {
    dispatch({
      type: "set_list_navigator",
      payload: "notifications",
    });
  };
  const GoToNotBoxList = () => {
    dispatch({
      type: "set_list_navigator",
      payload: "box-list",
    });
  };
  const navigation = useNavigation<NavigationProp<RootParamList>>();

  return (
    <TouchableWithoutFeedback onPress={handleOutsideClick}>
      <View style={styles.mainConteiner}>
        <View style={styles.mainView}>
          <Pressable
            onPress={() => handlePress()}
            style={styles.userInfoWrapper}
          >
            <Pressable onPress={GoToNotBoxList}>
              <Image style={styles.avatar} source={Logo} />
            </Pressable>
            <Text> {state.decodedUser.email}</Text>
          </Pressable>

          <View style={styles.iconWrapper}>
            <Pressable onPress={GoToNotifications}>
              <Image style={styles.bellIcon} source={Bell} />
              <View
                style={{
                  position: "absolute",
                  backgroundColor: "red",
                  width: 25,
                  height: 25,
                  borderRadius: 50,
                  padding: 2,
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <Text style={{ color: "white" }}>
                  {notificationState.notificationCounter}
                </Text>
              </View>
            </Pressable>
            <BurgerMenu />
          </View>
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
  iconWrapper: {
    width: "30%",
    gap: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
