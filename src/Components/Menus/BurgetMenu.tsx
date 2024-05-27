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

import { UseUserContext } from "../../Context/UserContext";

function BurgerMenu() {
  const { dispatch, logout } = UseUserContext();
  const [modalVisible, setModalVisible] = useState(false);

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
              onPress={() => {
                dispatch({ type: "set_list_navigator", payload: "box-list" });
                setModalVisible(false);
              }}
            >
              <Text style={styles.menuText}>Box List</Text>
            </Pressable>

            <Pressable
              style={styles.menuItem}
              onPress={() => {
                dispatch({
                  type: "set_list_navigator",
                  payload: "active-order",
                });
                setModalVisible(false);
              }}
            >
              <Text style={styles.menuText}>Active Orders</Text>
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
});
