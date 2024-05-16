import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ErrorPopup, SuccessPopup } from "../../Components/Status/Status";
import { loginType } from "../../types/Auth-types";
import { useMutation } from "@tanstack/react-query";
import { LoginPostRequest } from "../../API/Auth";
import { useNavigation } from "@react-navigation/native";
import AuthInput from "../../Components/Inputs/AuthInput";
// @ts-ignore
import Lock from "../../../assets/ICONS/lock.png";
// @ts-ignore
import Logo from "../../../assets/ICONS/logo-dark.png";
// @ts-ignore
import Mail from "../../../assets/ICONS/mail.png";
import { UseUserContext } from "../../Context/UserContext";
export default function Login() {
  const { decodeUser } = UseUserContext();

  var succsessMsg =
    "Your account will be validated shortly and you will receive a password and login by email";
  var errorMsg = "Something went wrong, contact support";
  const mutation = useMutation({
    mutationFn: (body: loginType) => {
      return LoginPostRequest(body);
    },
  });
  const navigation: any = useNavigation();

  const { isPending, isError, isSuccess } = mutation;

  const [email, setEmail] = useState("");
  const [password, setPasswored] = useState("");

  const handleSignUp = async () => {
    let body = {
      Email: email,
      Password: password,
    };

    await mutation.mutateAsync(body);
    if (!isError) {
      decodeUser();
      setTimeout(() => {
        navigation.navigate("User");
      }, 1000);
    }
  };

  const cleanUpStatus = () => {
    mutation.reset();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerTitle}>
        <Text style={{ fontSize: 26, fontWeight: "900" }}>Welcome Back</Text>
        <Text style={{ fontSize: 18 }}> Login back into your account</Text>
      </View>
      {isPending && <ActivityIndicator />}

      {isError && <ErrorPopup message={errorMsg} onClose={cleanUpStatus} />}
      {isSuccess && (
        <SuccessPopup message={succsessMsg} onClose={cleanUpStatus} />
      )}
      <View style={styles.formWrapper}>
        <Image style={styles.Logo} source={Logo} />

        <Text style={styles.title}>Login</Text>
        <View
          style={{
            paddingBottom: 6,
          }}
        >
          <AuthInput
            image={Mail}
            value={email}
            onChange={setEmail}
            placeHolder="E-mail"
          />
          <AuthInput
            image={Lock}
            value={password}
            onChange={setPasswored}
            placeHolder="Password"
          />
          <Text
            style={{
              color: "white",
              marginLeft: 210,
              fontSize: 15,
              fontWeight: "700",
            }}
          >
            Forgot Password?
          </Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.logInTextWrapper}>
        <Text>Don't have an account yet ? </Text>
        <Text
          onPress={() => navigation.navigate(`Registration`)}
          style={{ fontSize: 18, color: "#2c8ffa", fontWeight: "800" }}
        >
          Join Now
        </Text>
      </View>
    </View>
  );
}

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
  headerTitle: { marginRight: 120, marginBottom: 50 },
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
    marginBottom: 40,
  },

  button: {
    backgroundColor: "white",
    color: "black",
    marginTop: 10,
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
