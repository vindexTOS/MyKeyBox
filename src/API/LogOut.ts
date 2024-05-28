import AsyncStorage from "@react-native-async-storage/async-storage";

export const RemoveToken = async () => {
  await AsyncStorage.setItem("token", "");
};
