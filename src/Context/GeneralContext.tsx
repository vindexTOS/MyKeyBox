import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import jwt_decode from "jwt-decode";
import { decodedUserType } from "../types/Auth-types";
import ListNavigator from "../Screens/User/ListNavigator";
import { useNavigation } from "@react-navigation/native";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { GetNotConfirmedOrders } from "../API/Getlist";

type GeneralContextProviderProps = {
  children: ReactNode;
};

type State = {
  decodedUser: decodedUserType | any;
  token: string;
  dropDownLogOut: boolean;
  listNavigation: string;
  notificationsData: any[];
  notificationCounter: number;
  notificationLoading: boolean;
  reTriggerNotificationGet: boolean;
};

type Action = {
  type: string;
  payload: any;
};

type Cell = {
  state: State;
  dispatch: React.Dispatch<Action>;
  logout: () => void;
  decodeUser: () => void;
};

const Context = createContext<null | Cell>(null);

export const GeneralContextProvider = ({
  children,
}: GeneralContextProviderProps) => {
  const navigation: any = useNavigation();

  const initialState = {
    decodedUser: {},
    token: "",
    dropDownLogOut: false,
    listNavigation: "",
    notificationsData: [],
    notificationCounter: 0,
    notificationLoading: true,
    reTriggerNotificationGet: true,
  };
  const reducer = (state: State, action: Action) => {
    switch (action.type) {
      case "decode_user":
        return { ...state, decodedUser: action.payload };
      case "set_token":
        return { ...state, token: action.payload };
      case "set_drop_down_log_out":
        return { ...state, dropDownLogOut: action.payload };
      case "set_list_navigator":
        return { ...state, listNavigation: action.payload };
      case "set_notifications":
        return { ...state, notificationsData: action.payload };
      case "set_notification_count":
        return { ...state, notificationCounter: action.payload };
      case "set_notification_loading":
        return { ...state, notificationLoading: action.payload };
      case "re_trigger_notification":
        return { ...state, reTriggerNotificationGet: action.payload };
      default:
        return state;
    }
  };

  const decodeUser = async () => {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    if (token) {
      const decodedToken: decodedUserType = jwt_decode(token);
      console.log(decodedToken);
      dispatch({ type: "decode_user", payload: decodedToken });
      dispatch({ type: "set_token", payload: token });
    } else {
      navigation.navigation("Login");
    }
  };
  useEffect(() => {
    decodeUser();
  }, []);

  const [state, dispatch] = useReducer(reducer, initialState);
  const logout = async () => {
    await AsyncStorage.setItem("token", "");
    dispatch({ type: "decode_user", payload: {} });
  };

  const notificationQuerys: UseQueryResult<any, Error> = useQuery({
    queryKey: ["notifications", state.token, state.reTriggerNotificationGet],
    queryFn: GetNotConfirmedOrders,
    refetchInterval: 60000,
    enabled: !!state.token,
  });
  useEffect(() => {
    if (notificationQuerys.isSuccess) {
      const data = notificationQuerys.data;
      console.log("Query succeeded with data:", data.data);
      dispatch({ type: "set_notifications", payload: data.data });
      dispatch({ type: "set_notification_count", payload: data.data.length });
      dispatch({ type: "set_notification_loading", payload: false });
    }
  }, [notificationQuerys.isSuccess, notificationQuerys.data]);
  return (
    <Context.Provider value={{ state, dispatch, logout, decodeUser }}>
      {children}
    </Context.Provider>
  );
};

export const UseGeneralContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("Context Not Wrapped");
  }
  return context;
};
