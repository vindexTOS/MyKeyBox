import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { GetBoxesRequest } from "../../API/Getlist";
import { useQuery } from "@tanstack/react-query";
import { UseGeneralContext } from "../../Context/GeneralContext";
// @ts-ignore
import ActiveGrid from "../../../assets/ICONS/clicked-grid.png";
// @ts-ignore
import DefaultGrid from "../../../assets/ICONS/default-grid.png";
// @ts-ignore
import ActiveRow from "../../../assets/ICONS/active-row.png";
// @ts-ignore
import DefaultRow from "../../../assets/ICONS/default-row.png";
// @ts-ignore
import Safe from "../../../assets/ICONS/safe.png";
type GridRowType = "row" | "column";

export default function List() {
  const { state, logout } = UseGeneralContext();
  const { token } = state;
  const [boxList, setBoxList] = useState<any>([]);
  const [rowToGrid, setRowToGrid] = useState<GridRowType>("row");
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["box-list", token],
    queryFn: GetBoxesRequest,
    refetchInterval: 60000,
  });

  useEffect(() => {
    console.log(data);
    if (data && data?.data) {
      setBoxList(data.data);
    }
  }, [data]);

  return (
    <View style={style.mainContainer}>
      <View style={style.topSection}>
        <Text style={style.header}>My list</Text>
        <View style={style.iconWrapper}>
          <Pressable onPress={() => setRowToGrid("row")}>
            <Image
              style={style.gridIcon}
              source={rowToGrid == "row" ? ActiveGrid : DefaultGrid}
            />
          </Pressable>
          <Pressable onPress={() => setRowToGrid("column")}>
            <Image
              style={style.rowIcon}
              source={rowToGrid == "column" ? ActiveRow : DefaultRow}
            />
          </Pressable>
        </View>
      </View>
      {isLoading && <ActivityIndicator />}
      <View
        style={
          rowToGrid !== "column" ? style.listWrapper : style.listWrapperCol
        }
      >
        <View
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            flexDirection: rowToGrid,
            width: "100%",
            gap: 12,
          }}
        >
          {boxList.map((item: any, index: number) => (
            <View
              key={index}
              style={
                rowToGrid == "column" ? style.boxItemCol : style.boxItemRow
              }
            >
              <Image style={style.safeImage} source={Safe} />
              <Text style={style.name}>
                <Text style={{ color: "#333333" }}> Name: </Text>
                <Text style={{ color: "#333333" }}>{item.boxName}</Text>
              </Text>
              <Text style={style.status}>
                <Text style={{ color: "#2c8ffa" }}> Status: </Text>
                <Text
                  style={{ color: item.boxStatus == "Free" ? "green" : "red" }}
                >
                  {item.boxStatus}
                </Text>
              </Text>
            </View>
          ))}
        </View>
      </View>
      {/* <Text style={style.logoutBtn} onPress={logout}>
        LogOut
      </Text> */}
    </View>
  );
}

const style = StyleSheet.create({
  mainContainer: { padding: 7, backgroundColor: "#E4E4E4", height: "100%" },
  topSection: {
    width: "100%",
    paddingBottom: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  header: { fontSize: 35, color: "#2c8ffa" },
  name: { fontWeight: "900" },
  status: { fontWeight: "700", fontSize: 12 },
  safeImage: {
    width: 30,
    height: 30,
  },
  listWrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 6,
  },
  listWrapperCol: {
    width: "100%",
    display: "flex",

    alignItems: "center",
    justifyContent: "center",
  },
  boxItemRow: {
    width: "46%",
    height: 120,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  boxItemCol: {
    width: "100%",
    height: 50,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  iconWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    gap: 20,
  },
  gridIcon: {
    width: 20,
    height: 20,
  },
  rowIcon: {
    width: 20,
    height: 25,
  },
  logoutBtn: {
    width: "100%",
    height: 50,
    backgroundColor: "red",
  },
});
