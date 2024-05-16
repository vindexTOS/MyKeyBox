import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";
import { RegistrationPostRequest } from "../../API/Auth";
import { registrationType } from "../../types/Auth-types";
import { ErrorPopup, SuccessPopup } from "../../Components/Status/Status";
// @ts-ignore
import Lock from "../../../assets/ICONS/lock.png";
// @ts-ignore
import Phone from "../../../assets/ICONS/smartphone.png";
// @ts-ignore
import Logo from "../../../assets/ICONS/logo-dark.png";
import AuthInput from "../../Components/Inputs/AuthInput";
import { useNavigation } from "@react-navigation/native";
import { UseUserContext } from "../../Context/UserContext";
export default function Registration() {
  const { state } = UseUserContext();
  var succsessMsg =
    "Your account will be validated shortly and you will receive a password and login by email";
  var errorMsg = "Something went wrong, contact support";
  const mutation = useMutation({
    mutationFn: (body: registrationType) => {
      return RegistrationPostRequest(body);
    },
  });
  const navigation: any = useNavigation();

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

  useEffect(() => {
    if (state.decodedUser && state.decodedUser.userId) {
      navigation.navigate("User");
    }
  }, [state]);
  return (
    <View style={styles.container}>
      <View style={styles.headerTitle}>
        <Text style={{ fontSize: 26, fontWeight: "900" }}>
          Welcome in MyKeyBox
        </Text>
        <Text style={{ fontSize: 18 }}> Sigup into your account</Text>
      </View>
      {isPending && <ActivityIndicator />}

      {isError && <ErrorPopup message={errorMsg} onClose={cleanUpStatus} />}
      {isSuccess && (
        <SuccessPopup message={succsessMsg} onClose={cleanUpStatus} />
      )}
      <View style={styles.formWrapper}>
        <Image style={styles.Logo} source={Logo} />

        <Text style={styles.title}>Sign Up</Text>
        <View
          style={{
            paddingBottom: 6,
          }}
        >
          <AuthInput
            image={Phone}
            value={PhoneNumber}
            onChange={setPhoneNumber}
            placeHolder="Phone Number"
          />
          <AuthInput
            image={Lock}
            value={BoxUniqueCode}
            onChange={setLockerCode}
            placeHolder="Locker Code"
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.logInTextWrapper}>
        <Text>Already have an accoutn ? </Text>
        <Text
          onPress={() => navigation.navigate(`Login`)}
          style={{ fontSize: 18, color: "#2c8ffa", fontWeight: "800" }}
        >
          Log In
        </Text>
      </View>
    </View>
  );
}
// #2c8ffa
const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",
    paddingTop: 60,
    gap: 20,
  },
  headerTitle: { marginRight: 70, marginBottom: 30 },
  Logo: {
    width: 150,
    height: 150,
    position: "absolute",
    top: -70,
    right: 20,
    zIndex: 100,
  },
  formWrapper: {
    position: "relative",
    backgroundColor: "#2c8ffa",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "70%",
    width: "90%",
    borderTopLeftRadius: 90,
    borderTopRightRadius: 90,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 90,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#fff",

    textAlign: "center",
    marginRight: 170,
    marginBottom: 60,
  },

  button: {
    backgroundColor: "white",
    color: "black",

    padding: 15,
    borderRadius: 50,
    width: "80%",
  },
  buttonText: {
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  logInTextWrapper: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 30,
  },
});
