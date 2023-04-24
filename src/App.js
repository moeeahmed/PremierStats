import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AuthForm from "./pages/Authentication/AuthForm";
import ForgotPassword from "./pages/Authentication/ForgotPassword";
import Root from "./pages/Root/Root";
import Error from "./pages/Error/Error";
import Home from "./pages/Home/Home";
import Accounts from "./pages/Accounts/Accounts";
import Fixtures from "./pages/Fixtures/Fixtures";
import Logout from "./pages/Logout/Logout";
import ManageUser from "./pages/Accounts/ManageUser";
import DeleteAccount from "./pages/Accounts/DeleteAccount";
import PrivateRoutes from "./utils/PrivateRoutes";
import { UpdateScores, UpdateStats } from "./pages/Accounts/Update";
import AccountDetails from "./pages/Accounts/AccountDetails";

import { fetchApi } from "./utils/fetchApi";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <AuthForm />,
    errorElement: <Error />,
  },
  {
    path: "/signup",
    element: <AuthForm isSignup={true} />,
    errorElement: <Error />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    errorElement: <Error />,
  },
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: <Home />,
        loader: () => fetchApi({ url: "api/v1/fixture/home" }),
      },
      {
        path: "fixtures",
        element: <Fixtures />,
        loader: () => fetchApi({ url: "api/v1/fixture/fixtures" }),
      },
      {
        path: "account",
        element: <Accounts />,
        loader: () => fetchApi({ url: "api/v1/user/getUser" }, true),
        children: [
          {
            path: "details",
            element: <AccountDetails />,
          },
          {
            path: "delete-account",
            element: <DeleteAccount />,
          },
          {
            element: <PrivateRoutes />,
            loader: () => fetchApi({ url: "api/v1/user/getUser" }, true),
            children: [
              {
                path: "update-scores",
                element: <UpdateScores />,
                loader: () =>
                  fetchApi({ url: "api/v1/fixture/getScoresToUpdate" }, true),
              },
              {
                path: "update-statistics",
                element: <UpdateStats />,
                loader: () =>
                  fetchApi({ url: "api/v1/fixture/getStatsToUpdate" }, true),
              },
              {
                path: "manage-users",
                element: <ManageUser />,
                loader: () =>
                  fetchApi({ url: "api/v1/user/getAllUsers" }, true),
              },
            ],
          },
        ],
      },
      {
        path: "logout",
        element: <Logout />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
