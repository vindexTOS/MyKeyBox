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

type UserContextProviderProps = {
  children: ReactNode;
};

type State = {
  decodedUser: decodedUserType | any;
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
  };
  const reducer = (state: State, action: Action) => {
    switch (action.type) {
      case "decode_user":
        return { ...state, decodedUser: action.payload };
      default:
        return state;
    }
  };

  const decodeUser = async () => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      const decodedToken: decodedUserType = jwt_decode(token);
      dispatch({ type: "decode_user", payload: decodedToken });
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
