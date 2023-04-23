import React from "react";
import { Navigate, Outlet, redirect, useLoaderData } from "react-router-dom";

import { store } from "../store/index";

export const loader = async () => {
  const { token } = store.getState().auth;

  if (!token) {
    return redirect("/");
  } else {
    const response = await fetch("http://localhost:9000/api/v1/user/getUser", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.log(response);
    } else {
      const resData = await response.json();
      return resData.data;
    }
  }
};

const PrivateRoutes = () => {
  const data = useLoaderData();

  return data.user.role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/account/settings" />
  );
};

export default PrivateRoutes;
