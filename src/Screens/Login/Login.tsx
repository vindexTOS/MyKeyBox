import React, { useState, useEffect, useRef } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Animated,
  Platform,
} from "react-native";
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
import { UseGeneralContext } from "../../Context/GeneralContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const { decodeUser } = UseGeneralContext();

  var succsessMsg = "You have been logged in";
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
  };

  useEffect(() => {
    if (!isError) {
      if (password && email) {
        decodeUser();
        setTimeout(() => {
          navigation.navigate("User");
        }, 1000);
      }
    }
  }, [isSuccess]);

  const cleanUpStatus = () => {
    mutation.reset();
  };

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const formHeight = useRef(new Animated.Value(0.7)).current;
  const formBorderRadius = useRef(new Animated.Value(1)).current;
  const headerOpacity = useRef(new Animated.Value(1)).current;
  const logoOpacity = useRef(new Animated.Value(1)).current;
  const footerOpacity = useRef(new Animated.Value(1)).current;
  const innerPadding = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
        Animated.parallel([
          Animated.timing(formHeight, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
          }),
          Animated.timing(formBorderRadius, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }),
          Animated.timing(headerOpacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }),
          Animated.timing(logoOpacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }),
          Animated.timing(footerOpacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }),
          Animated.timing(innerPadding, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }),
        ]).start();
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
        Animated.parallel([
          Animated.timing(formHeight, {
            toValue: 0.7,
            duration: 300,
            useNativeDriver: false,
          }),
          Animated.timing(formBorderRadius, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
          }),
          Animated.timing(headerOpacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
          }),
          Animated.timing(logoOpacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
          }),
          Animated.timing(footerOpacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
          }),
          Animated.timing(innerPadding, {
            toValue: 20,
            duration: 300,
            useNativeDriver: false,
          }),
        ]).start();
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  let formWrapperStyle = {
    height: formHeight.interpolate({
      inputRange: [0.7, 1],
      outputRange: ["70%", "100%"],
    }),
    borderTopLeftRadius: formBorderRadius.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 90],
    }),
    borderTopRightRadius: formBorderRadius.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 90],
    }),
    borderBottomLeftRadius: formBorderRadius.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 20],
    }),
    borderBottomRightRadius: formBorderRadius.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 90],
    }),
  };
  let innerStyle = {
    padding: innerPadding.interpolate({
      inputRange: [0, 20],
      outputRange: [0, 20],
    }),
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback
        style={{ width: "100%" }}
        onPress={Keyboard.dismiss}
      >
        <Animated.View style={[styles.inner, innerStyle]}>
          {!isKeyboardVisible && (
            <View style={styles.headerTitle}>
              <Text style={{ fontSize: 26, fontWeight: "900" }}>
                Welcome Back
              </Text>
              <Text style={{ fontSize: 18 }}>Login back into your account</Text>
            </View>
          )}
          {isPending && <ActivityIndicator />}
          {isError && <ErrorPopup message={errorMsg} onClose={cleanUpStatus} />}
          {/* {isSuccess && (
            <SuccessPopup message={succsessMsg} onClose={cleanUpStatus} />
          )} */}
          <Animated.View style={[styles.formWrapper, formWrapperStyle]}>
            <Animated.View
              style={[
                {
                  opacity: logoOpacity,
                  position: "absolute",
                  top: -70,
                  right: 20,
                  zIndex: 100,
                },
              ]}
            >
              <Image style={styles.Logo} source={Logo} />
            </Animated.View>
            <Text style={styles.title}>Login</Text>
            <View style={{ position: "relative", paddingBottom: 6 }}>
              <AuthInput
                image={Mail}
                value={email}
                onChange={setEmail}
                placeHolder="E-mail"
                onFocus={() => setKeyboardVisible(true)}
                onBlur={() => setKeyboardVisible(false)}
              />
              <AuthInput
                image={Lock}
                value={password}
                onChange={setPasswored}
                placeHolder="Password"
                type={true}
                onFocus={() => setKeyboardVisible(true)}
                onBlur={() => setKeyboardVisible(false)}
              />
              <Text
                style={{
                  position: "absolute",
                  top: 155,
                  right: 20,
                  color: "white",
                  width: "95%",
                  textAlign: "right",
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
          </Animated.View>
          {!isKeyboardVisible && (
            <View style={styles.logInTextWrapper}>
              <Text>Don't have an account yet ? </Text>
              <Text
                onPress={() => navigation.navigate(`Registration`)}
                style={{
                  fontSize: 18,
                  color: "#2c8ffa",
                  fontWeight: "800",
                }}
              >
                Join Now
              </Text>
            </View>
          )}
        </Animated.View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
    width: "100%",
    backgroundColor: "#89cff0",
    alignItems: "center",
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    width: "100%",
  },
  headerTitle: {
    marginRight: 10,
    marginBottom: 60,
    width: "100%",
  },
  Logo: {
    width: 150,
    height: 150,
  },
  formWrapper: {
    position: "relative",
    backgroundColor: "#2c8ffa",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 90,
    borderTopRightRadius: 90,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 90,
    width: "100%",
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
