import { ApiManager } from "./ApiManager";
import { envirement } from "../envirement/env";
import axios from "axios";

export const SetStatusOrder = async (dealerCode: string) => {
  console.log(
    `https://MyKeyBox.com/DealerOrders/SetStatusOrder/?dealerCode=${dealerCode}`
  );
  try {
    const res = await axios.post(
      `https://MyKeyBox.com/DealerOrders/SetStatusOrder/?dealerCode=${dealerCode}`,
      {
        ApiKey: envirement.apiKey,
      }
    );

    console.log(res);
    return res;
  } catch (error) {
    const err: any = error;
    console.log(err);
    throw new Error(err);
  }
};
