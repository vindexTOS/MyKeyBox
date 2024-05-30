import { UseQueryResult, useQuery } from "@tanstack/react-query";
import {
  useContext,
  createContext,
  ReactNode,
  useReducer,
  useEffect,
} from "react";
import { GetNotConfirmedOrders } from "../API/Getlist";
import { UseGeneralContext } from "./GeneralContext";
import * as Notifications from "expo-notifications";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import AsyncStorage from "@react-native-async-storage/async-storage";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const sendPushNotification = async ({ data }: { data: any }) => {
  const message = {
    sound: "default",
    title: `New order ${data.dealerCode}`,
    body: ` ${data.dealer}`,
    data: { someData: "" },
  };

  await Notifications.scheduleNotificationAsync({
    content: message,
    trigger: null,
  });
};

type Cell = {
  notificationState: State;
  dispatchNotification: React.Dispatch<Action>;
};
type NotificationProp = {
  children: ReactNode;
};

const Context = createContext<null | Cell>(null);

type Action =
  | { type: "set_notifications"; payload: any[] }
  | { type: "set_notification_count"; payload: number }
  | { type: "set_notification_loading"; payload: boolean }
  | { type: "re_trigger_notification"; payload: boolean };

type State = {
  notificationsData: any[];
  notificationCounter: number;
  notificationLoading: boolean;
  reTriggerNotificationGet: boolean;
};

export const NotificationProvider = ({ children }: NotificationProp) => {
  const { state } = UseGeneralContext();
  const initialState = {
    notificationsData: [],
    notificationCounter: 0,
    notificationLoading: true,
    reTriggerNotificationGet: true,
  };
  const reducer = (state: State, action: Action) => {
    switch (action.type) {
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
  const [notificationState, dispatchNotification] = useReducer(
    reducer,
    initialState
  );
  const notificationQuerys: UseQueryResult<any, Error> = useQuery({
    queryKey: [
      "notifications",
      state.token,
      notificationState.reTriggerNotificationGet,
    ],
    queryFn: GetNotConfirmedOrders,
    refetchInterval: 60000,
    enabled: !!state.token,
  });
  const PushNotifaction = async (data: any) => {
    await sendPushNotification({ data });
  };

  const updateNotificationDateIfMoreRecent = async (newDate: string) => {
    const storedDate = await AsyncStorage.getItem("notification-date");

    if (
      !storedDate ||
      new Date(newDate).getTime() > new Date(storedDate).getTime()
    ) {
      await AsyncStorage.setItem("notification-date", newDate);
      return true;
    }

    return false;
  };

  const getMostRecentNotification = async (data: any[]) => {
    if (!data || data.length === 0) {
      return null;
    }

    const sortedData = data.sort(
      (a, b) =>
        new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
    );
    const isNew = await updateNotificationDateIfMoreRecent(
      sortedData[0].orderDate
    );
    return {
      data: sortedData[0],
      isNew,
    };
  };

  useEffect(() => {
    const handleNotifications = async () => {
      if (notificationQuerys.isSuccess) {
        const data = notificationQuerys.data.data;
        dispatchNotification({
          type: "set_notifications",
          payload: data,
        });
        dispatchNotification({
          type: "set_notification_count",
          payload: data.length,
        });
        dispatchNotification({
          type: "set_notification_loading",
          payload: false,
        });

        const mostRecentNotification: any = await getMostRecentNotification(
          data
        );
        console.log(
          "true or false >?>>>>>>>>>>>>>>>>>>> ",
          mostRecentNotification.isNew
        );
        if (mostRecentNotification.isNew) {
          PushNotifaction(mostRecentNotification.data);
        }
      }
    };
    handleNotifications();
  }, [notificationQuerys.isSuccess, notificationQuerys.data]);

  useEffect(() => {
    const registerBackgroundFetch = async () => {
      try {
        await BackgroundFetch.registerTaskAsync(TASK_NAME, {
          minimumInterval: 60,
          stopOnTerminate: false,
          startOnBoot: true,
        });
        // console.log("Background fetch registered");
      } catch (err) {
        // console.log("Background fetch failed to register", err);
      }
    };

    registerBackgroundFetch();

    return () => {
      BackgroundFetch.unregisterTaskAsync(TASK_NAME);
    };
  }, [state.token]);
  return (
    <Context.Provider value={{ notificationState, dispatchNotification }}>
      {children}
    </Context.Provider>
  );
};

export const UseNotification = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("now wrapped notification");
  }

  return context;
};
const TASK_NAME = "BACKGROUND_FETCH";

TaskManager.defineTask(TASK_NAME, async () => {
  const { state } = UseGeneralContext();
  const token = state.token;
  if (!token) {
    return BackgroundFetch.BackgroundFetchResult.NoData;
  }

  try {
    const data = await GetNotConfirmedOrders({ queryKey: token });
    await sendPushNotification({ data });

    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch (err) {
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});
