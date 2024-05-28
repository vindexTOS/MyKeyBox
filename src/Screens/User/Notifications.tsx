import {
  View,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { UseGeneralContext } from "../../Context/GeneralContext";
import ActiveOrderModal from "../../Components/Modal/OrderListModal";

export default function Notifications() {
  const { state } = UseGeneralContext();
  const { notificationsData } = state;
  const [singleData, setSingleData] = useState<any>({});
  useEffect(() => {
    console.log(singleData);
  }, [singleData]);

  if (state.notificationLoading) {
    return <ActivityIndicator />;
  }
  return (
    <View
      style={{
        display: "flex",

        width: "100%",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          borderBottomWidth: 1,
          paddingVertical: 10,
          backgroundColor: "orange",
        }}
      >
        <Text
          style={{
            flex: 1,
            textAlign: "center",
            fontWeight: "bold",
            color: "white",
          }}
        >
          Vin
        </Text>
        <Text
          style={{
            flex: 1,
            textAlign: "center",
            fontWeight: "bold",
            color: "white",
          }}
        >
          Dealer
        </Text>
      </View>

      <ScrollView
        style={{
          height: "80%",

          width: "100%",
          overflow: "scroll",
        }}
      >
        {singleData.id && (
          <ActiveOrderModal
            type="notifications"
            data={singleData}
            reSet={setSingleData}
          />
        )}
        {notificationsData.map((item: any, index: number) => (
          <Pressable
            onPress={() => setSingleData(item)}
            key={item.id}
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              paddingVertical: 10,
              backgroundColor: index % 2 === 1 ? "lightgray" : "white",
              gap: 2,
            }}
          >
            <Text style={{ flex: 1, textAlign: "center", fontSize: 14 }}>
              {item.vin}
            </Text>
            <Text style={{ flex: 1, textAlign: "center", fontSize: 14 }}>
              {item.dealerCode}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
