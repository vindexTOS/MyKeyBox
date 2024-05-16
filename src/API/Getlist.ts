import { envirement } from "../envirement/env";
import { ApiManager } from "./ApiManager";

export const GetBoxesRequest = async (token: string) => {
  try {
    const res: any = await ApiManager("/Dealer/GetBoxes", {
      method: "GET",

      headers: {
        ApiKey: envirement.apiKey,
        Authorization: `Bearer ${token}`,
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