import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Pressable,
} from "react-native";
import { GetActiveOrders } from "../../API/Getlist";
import { UseUserContext } from "../../Context/UserContext";
import { useQuery } from "@tanstack/react-query";
import ActiveOrderModal from "../../Components/Modal/ActiveOrderModal";

export default function ActiveOrders() {
  const { state, logout } = UseUserContext();

  const { token } = state;

  const [singleData, setSingleData] = useState<any>({});
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["active-orders", token],
    queryFn: GetActiveOrders,
  });
  // useEffect(() => {
  //   console.log(data.data);
  // }, [data]);
  if (isPending) {
    return <ActivityIndicator />;
  }
  if (data && data?.data) {
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
            backgroundColor: "#2c8ffa",
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
            Carrier
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
            <ActiveOrderModal data={singleData} reSet={setSingleData} />
          )}
          {data?.data.map((item: any, index: number) => (
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
                {item.memberName}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    );
  }
}
