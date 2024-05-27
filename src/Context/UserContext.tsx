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

type UserContextProviderProps = {
  children: ReactNode;
};

type State = {
  decodedUser: decodedUserType | any;
  token: string;
  dropDownLogOut: boolean;
  listNavigation: string;
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

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const initialState = {
    decodedUser: {},
    token: "",
    dropDownLogOut: false,
    listNavigation: "",
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
      default:
        return state;
    }
  };

  const decodeUser = async () => {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    if (token) {
      const decodedToken: decodedUserType = jwt_decode(token);
      dispatch({ type: "decode_user", payload: decodedToken });
      dispatch({ type: "set_token", payload: token });
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

  return (
    <Context.Provider value={{ state, dispatch, logout, decodeUser }}>
      {children}
    </Context.Provider>
  );
};

export const UseUserContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("Context Not Wrapped");
  }
  return context;
};
