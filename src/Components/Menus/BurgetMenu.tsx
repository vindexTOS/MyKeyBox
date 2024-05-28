import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import { NativeBaseProvider } from "native-base";
// @ts-ignore
import BurgetIcon from "../../../assets/ICONS/default-row.png";

import { UseGeneralContext } from "../../Context/GeneralContext";

function BurgerMenu() {
  const { dispatch, logout, state } = UseGeneralContext();
  const [modalVisible, setModalVisible] = useState(false);

  const NavigationFunction = (payload: string) => {
    dispatch({ type: "set_list_navigator", payload: payload });
    setModalVisible(false);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image style={{ width: 20, height: 20 }} source={BurgetIcon} />
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.menuContainer}>
            <Pressable
              style={styles.menuItem}
              onPress={() => NavigationFunction("box-list")}
            >
              <Text style={styles.menuText}>Box List</Text>
            </Pressable>

            <Pressable
              style={styles.menuItem}
              onPress={() => NavigationFunction("active-order")}
            >
              {/* type: "set_list_navigator", payload: "notifications", */}
              <Text style={styles.menuText}>Active Orders</Text>
            </Pressable>
            <Pressable
              style={styles.menuItem}
              onPress={() => NavigationFunction("notifications")}
            >
              <View style={styles.notificationWrapper}>
                <Text style={styles.menuText}>Notifications</Text>
                <View style={styles.notificationStyle}>
                  <Text style={{ color: "white" }}>
                    {state.notificationCounter}
                  </Text>
                </View>
              </View>
            </Pressable>

            <Pressable
              style={[styles.menuItem, styles.logoutBtn]}
              onPress={logout}
            >
              <Text style={styles.logOutText}>Log Out</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

export default BurgerMenu;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    position: "relative",
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  menuContainer: {
    position: "absolute",
    right: 5,
    top: 90,
    width: 200,
    height: "90%",
    backgroundColor: "white",

    overflow: "hidden",
  },
  menuItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  menuText: {
    fontSize: 16,
  },
  logoutBtn: {
    backgroundColor: "orange",
  },
  logOutText: {
    color: "white",
    fontWeight: "900",
    fontSize: 18,
  },
  notificationStyle: {
    display: "flex",

    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green",

    width: 24,
    height: 24,
    borderRadius: 50,
    padding: 2,
    fontSize: 11,
  },
  notificationWrapper: {
    display: "flex",
    gap: 5,
    alignItems: "center",
    flexDirection: "row",
  },
});
