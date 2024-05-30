import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { RegistrationPostRequest } from "../../API/Auth";
import { registrationType } from "../../types/Auth-types";
import { ErrorPopup, SuccessPopup } from "../../Components/Status/Status";
// @ts-ignore
import Lock from "../../../assets/ICONS/lock.png";
// @ts-ignore
import Mail from "../../../assets/ICONS/mail.png";

// @ts-ignore
import Logo from "../../../assets/ICONS/logo-dark.png";
import AuthInput from "../../Components/Inputs/AuthInput";
import { useNavigation } from "@react-navigation/native";
import { UseGeneralContext } from "../../Context/GeneralContext";
export default function Registration() {
  const { state } = UseGeneralContext();
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

  const [Email, setEmail] = useState("");
  const [BoxUniqueCode, setLockerCode] = useState("");

  const handleSignUp = async () => {
    let body = {
      Email,
      BoxUniqueCode,
    };

    await mutation.mutateAsync(body);
  };

  const cleanUpStatus = () => {
    mutation.reset();
  };
  const formHeight = useRef(new Animated.Value(0.7)).current;
  const formBorderRadius = useRef(new Animated.Value(1)).current;
  const headerOpacity = useRef(new Animated.Value(1)).current;
  const titleSize = useRef(new Animated.Value(1)).current;
  const logoOpacity = useRef(new Animated.Value(1)).current;
  const footerOpacity = useRef(new Animated.Value(1)).current;
  const innerPadding = useRef(new Animated.Value(20)).current;
  useEffect(() => {
    if (state.decodedUser && state.decodedUser.userId) {
      navigation.navigate("User");
    }
  }, [state]);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

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

  let titleStyle = {
    fontSize: titleSize.interpolate({
      inputRange: [0, 20],
      outputRange: [0, 20],
    }),
  };
  return (
    <KeyboardAvoidingView
      style={
        !isKeyboardVisible ? styles.container : styles.whenKeyBoardOpenContainer
      }
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Animated.View style={[styles.inner, innerStyle]}>
          {!isKeyboardVisible && (
            <View style={styles.headerTitle}>
              <Text style={{ fontSize: 26, fontWeight: "900" }}>
                Welcome in MyKeyBox
              </Text>
              <Text style={{ fontSize: 18 }}> Sigup into your account</Text>
            </View>
          )}
          {isPending && <ActivityIndicator />}

          {isError && <ErrorPopup message={errorMsg} onClose={cleanUpStatus} />}
          {isSuccess && (
            <SuccessPopup message={succsessMsg} onClose={cleanUpStatus} />
          )}
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
            <Text style={styles.title}>Sign Up</Text>
            <View
              style={{
                paddingBottom: 6,
              }}
            >
              <AuthInput
                image={Mail}
                value={Email}
                onChange={setEmail}
                placeHolder="Email"
                onFocus={() => setKeyboardVisible(true)}
                onBlur={() => setKeyboardVisible(false)}
              />
              <AuthInput
                image={Lock}
                value={BoxUniqueCode}
                onChange={setLockerCode}
                placeHolder="Locker Code"
                onFocus={() => setKeyboardVisible(true)}
                onBlur={() => setKeyboardVisible(false)}
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
              <Text style={[styles.buttonText]}>Sign Up</Text>
            </TouchableOpacity>
          </Animated.View>
          {!isKeyboardVisible && (
            <View style={styles.logInTextWrapper}>
              <Text>Already have an accoutn ? </Text>
              <Text
                onPress={() => navigation.navigate(`Login`)}
                style={{
                  fontSize: 18,
                  color: isKeyboardVisible ? "#ffbf00" : "#2c8ffa",
                  fontWeight: "800",
                }}
              >
                Log In
              </Text>
            </View>
          )}
        </Animated.View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
  },
  whenKeyBoardOpenContainer: {
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
  whenKeyBoardOpenInner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    backgroundColor: "#2c8ffa",
    width: "100%",
    height: "100%",
  },
  headerTitle: { marginRight: 10, marginBottom: 50, width: "100%" },
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
    height: "70%",
    width: "100%",
    borderTopLeftRadius: 90,
    borderTopRightRadius: 90,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 90,
  },
  whenKeyBoardFormWrapper: {
    position: "relative",
    backgroundColor: "#2c8ffa",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "70%",
    width: "100%",
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#fff",

    textAlign: "center",
    marginRight: 170,
    marginBottom: 50,
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
