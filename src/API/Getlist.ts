import { envirement } from "../envirement/env";
import { ApiManager } from "./ApiManager";

export const GetBoxesRequest = async ({
  queryKey,
}: {
  queryKey: any;
}): Promise<any> => {
  const token = queryKey[1];
  try {
    const res: any = await ApiManager("/Dealer/GetBoxes", {
      method: "GET",

      headers: {
        ApiKey: envirement.apiKey,
        Authorization: `Bearer ${token}`,
      },
    });

    return res;
  } catch (error) {
    const err: any = error;
    console.log(err);
    if (err.response.status == 401) {
    }

    throw new Error(err);
  }
};

export const GetActiveOrders = async ({
  queryKey,
}: {
  queryKey: any;
}): Promise<any> => {
  const token = queryKey[1];
  try {
    const res: any = await ApiManager("/Dealer/GetActiveOrders", {
      method: "GET",

      headers: {
        ApiKey: envirement.apiKey,
        Authorization: `Bearer ${token}`,
      },
    });

    return res;
  } catch (error) {
    const err: any = error;
    console.log(err);
    if (err.response.status == 401) {
      throw new Error(err);
    }
  }
};
export const GetNotConfirmedOrders = async ({
  queryKey,
}: {
  queryKey: any;
}): Promise<any> => {
  const token = queryKey[1];

  if (token) {
    try {
      const res: any = await ApiManager("/Dealer/GetNotConfirmedOrders", {
        method: "GET",

        headers: {
          ApiKey: envirement.apiKey,
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      return res;
    } catch (error) {
      const err: any = error;
      console.log(err);
      if (err.response.status == 401) {
        throw new Error(err);
      }
    }
  }
};
