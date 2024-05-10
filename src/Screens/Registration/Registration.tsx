import {
  UseMutationOptions,
  UseMutationResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { RegistrationPostRequest } from "../../API/Auth";
import { registrationType } from "../../types/Auth-types";
import { ErrorPopup, SuccessPopup } from "../../Components/Status/Status";

export default function Registration() {
  var succsessMsg =
    "Your account will be validated shortly and you will receive a password and login by email";
  var errorMsg = "Something went wrong, contact support";
  const mutation = useMutation({
    mutationFn: (body: registrationType) => {
      return RegistrationPostRequest(body);
    },
  });

  const { isPending, isError, isSuccess } = mutation;

  const [PhoneNumber, setPhoneNumber] = useState("");
  const [BoxUniqueCode, setLockerCode] = useState("");

  const handleSignUp = async () => {
    let body = {
      PhoneNumber,
      BoxUniqueCode,
    };

    await mutation.mutateAsync(body);
  };

  const cleanUpStatus = () => {
    mutation.reset();
  };
  return (
    <View style={styles.container}>
      {isPending && <ActivityIndicator />}

      {isError && <ErrorPopup message={errorMsg} onClose={cleanUpStatus} />}
      {isSuccess && (
        <SuccessPopup message={succsessMsg} onClose={cleanUpStatus} />
      )}
      <Text style={styles.title}>
        Welcome in MyKeyBox Sigup into your account
      </Text>
      <TextInput
        style={styles.input}
        placeholder="PhoneNumber"
        value={PhoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Locker Code"
        value={BoxUniqueCode}
        onChangeText={setLockerCode}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2c8ffa",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    width: "80%",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
