import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect } from "react";
import { UseUserContext } from "../../Context/UserContext";
import UserNav from "./UserNav";
import List from "./List";
import BurgerMenu from "../../Components/Menus/BurgetMenu";
import ListNavigator from "./ListNavigator";
export default function User() {
  const { logout, state, dispatch } = UseUserContext();
  // TO DO LATER make switch statment navigation if there is any other component for users

  const handleOutsideClick = () => {
    if (state.dropDownLogOut) {
      dispatch({
        type: "set_drop_down_log_out",
        payload: false,
      });
    }
  };
  return (
    <TouchableWithoutFeedback>
      <View>
        <UserNav />

        <ListNavigator />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  logoutBtn: {
    color: "white",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    width: "70%",
    borderRadius: 10,
    backgroundColor: "orange",
  },
  logOutText: {
    color: "white",
    fontWeight: "900",
    fontSize: 18,
  },
  selectDropDown: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    position: "absolute",
    zIndex: 3001,
    top: 100,
    left: 20,
    width: 170,
    height: 50,
    backgroundColor: "#f8f8ff",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 1.51,
    elevation: 4,
  },
});
