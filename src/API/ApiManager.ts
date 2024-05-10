import axios from "axios";

export const ApiManager = axios.create({
  baseURL: `https://MyKeyBox.com/Umbraco/Api/`,
  responseType: "json",
  withCredentials: true,
  httpsAgent: {
    rejectUnauthorized: false,
  },
});
