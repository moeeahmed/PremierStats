import React from "react";
import { Navigate, Outlet, useLoaderData } from "react-router-dom";

const PrivateRoutes = () => {
  const { user } = useLoaderData();

  return user.role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/account/settings" />
  );
};

export default PrivateRoutes;
