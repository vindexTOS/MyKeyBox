import React, { useEffect } from "react";
import { UseUserContext } from "../../Context/UserContext";
import List from "./List";
import ActiveOrders from "./ActiveOrders";

function ListNavigator() {
  const { state } = UseUserContext();

  useEffect(() => {
    console.log(state.listNavigation);
  }, [state]);
  switch (state.listNavigation) {
    case "box-list":
      return <List />;
    case "active-order":
      return <ActiveOrders />;

    default:
      return <List />;
  }
}

export default ListNavigator;
