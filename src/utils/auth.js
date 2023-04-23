import { redirect } from "react-router-dom";
import { store } from "../store";

export const checkIsAdmin = () => {
  const admin = store.getState();

  if (!admin) {
    return redirect("/account/settings");
  } else {
    return true;
  }
};
