import { registrationType } from "../types/Auth-types";
import { ApiManager } from "./ApiManager";

export const RegistrationPostRequest = async (
  body: registrationType
): Promise<any> => {
  try {
    const res: any = await ApiManager("/Dealer/DealerRegistration", {
      method: "POST",
      data: body,
      headers: {
        ApiKey: "z7#D4k9@A9",
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
