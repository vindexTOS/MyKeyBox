import { useMutation } from "@tanstack/react-query";
import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Button,
  ActivityIndicator,
} from "react-native";
import { SetStatusOrder } from "../../API/PostRequests";
import { ErrorPopup, SuccessPopup } from "../Status/Status";
import { UseGeneralContext } from "../../Context/GeneralContext";
import { UseNotification } from "../../Context/NotficationsContext";

export default function ActiveOrderModal({
  data,
  reSet,
  type,
}: {
  data: any;
  reSet: any;
  type: string;
}) {
  const { state, dispatch } = UseGeneralContext();
  const { notificationState, dispatchNotification } = UseNotification();
  const mutation = useMutation({
    mutationFn: (dealerCode: string) => {
      console.log(dealerCode);
      return SetStatusOrder(dealerCode);
    },
  });

  const ConfirmRequest = async () => {
    await mutation.mutateAsync(data.dealerCode);
  };
  const cleanUpStatus = () => {
    mutation.reset();
    dispatchNotification({
      type: "re_trigger_notification",
      payload: !notificationState.reTriggerNotificationGet,
    });
    reSet({});
  };
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={true}
      onRequestClose={() => reSet({})}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => reSet({})}
          >
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Text style={styles.modalHeader}>
            {type == "activeOrder" ? "Active Order" : "Notifications"}
          </Text>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {Object.keys(data).map((key) => (
              <View key={key} style={styles.row}>
                <Text
                  selectable={true}
                  style={{ fontSize: 12, fontWeight: "bold" }}
                >
                  {key}
                </Text>
                <Text
                  selectable={true}
                  style={{ fontSize: 12, textAlign: "left" }}
                >
                  {data[key]}
                </Text>
              </View>
            ))}
          </ScrollView>
          {mutation.isPending && <ActivityIndicator />}
          {mutation.isError && (
            <ErrorPopup
              message={"something went wrong"}
              onClose={cleanUpStatus}
            />
          )}
          {mutation.isSuccess && (
            <SuccessPopup message={"Confirmed!"} onClose={cleanUpStatus} />
          )}

          <View style={styles.footer}>
            <Button title="Close" onPress={() => reSet({})} />
            {type == "notifications" && (
              <Button
                color={"green"}
                title="Confirm"
                onPress={ConfirmRequest}
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    width: "90%",
    maxHeight: "90%",
    backgroundColor: "white",
    borderRadius: 20,

    alignItems: "center",
    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  scrollViewContent: {
    width: "100%",
  },
  row: {
    width: 200,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
  },
  keyText: {
    flex: 1,
    fontSize: 11,
    fontWeight: "bold",
    color: "#333",
  },
  valueText: {
    flex: 2,
    fontSize: 12,
    textAlign: "right",
    color: "#666",
  },
  footer: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
    paddingBottom: 3,
  },
});
