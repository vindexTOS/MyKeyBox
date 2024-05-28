import React, { useEffect } from "react";
import { UseGeneralContext } from "../../Context/GeneralContext";
import List from "./List";
import ActiveOrders from "./ActiveOrders";
import Notifications from "./Notifications";

function ListNavigator() {
  const { state } = UseGeneralContext();

  useEffect(() => {
    console.log(state.listNavigation);
  }, [state]);
  switch (state.listNavigation) {
    case "box-list":
      return <List />;
    case "active-order":
      return <ActiveOrders />;
    case "notifications":
      return <Notifications />;
    default:
      return <List />;
  }
}

export default ListNavigator;
