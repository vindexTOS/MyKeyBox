import { registrationType, loginType } from "../types/Auth-types";
import { ApiManager } from "./ApiManager";
import { envirement } from "../envirement/env";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const RegistrationPostRequest = async (
  body: registrationType
): Promise<any> => {
  try {
    const res: any = await ApiManager("/Dealer/DealerRegistration", {
      method: "POST",
      data: body,
      headers: {
        ApiKey: envirement.apiKey,
      },
    });
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    const err: any = error;
    throw new Error(err);
  }
};

export const LoginPostRequest = async (body: loginType): Promise<any> => {
  try {
    const res: any = await ApiManager("Dealer/Login", {
      method: "POST",
      data: body,
      headers: {
        ApiKey: envirement.apiKey,
      },
    });

    await AsyncStorage.setItem("token", res.data);
    return res;
  } catch (error) {
    console.log(error);
    const err: any = error;
    throw new Error(err);
  }
};
