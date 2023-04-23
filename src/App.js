import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AuthForm from "./pages/Authentication/AuthForm";
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
import AccountSettings from "./pages/Accounts/AccountSettings";
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
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: <Home />,
        loader: () => fetchApi("api/v1/fixture/home"),
      },
      {
        path: "fixtures",
        element: <Fixtures />,
        loader: () => fetchApi("api/v1/fixture/fixtures"),
      },
      {
        path: "account",
        element: <Accounts />,
        loader: () => fetchApi("api/v1/user/getUser", true),
        children: [
          {
            path: "details",
            element: <AccountSettings />,
          },
          {
            path: "delete-account",
            element: <DeleteAccount />,
          },
          {
            element: <PrivateRoutes />,
            loader: () => fetchApi("api/v1/user/getUser", true),
            children: [
              {
                path: "update-scores",
                element: <UpdateScores />,
                loader: () =>
                  fetchApi("api/v1/fixture/getScoresToUpdate", true),
              },
              {
                path: "update-statistics",
                element: <UpdateStats />,
                loader: () => fetchApi("api/v1/fixture/getStatsToUpdate", true),
              },
              {
                path: "manage-users",
                element: <ManageUser />,
                loader: () => fetchApi("api/v1/user/getAllUsers", true),
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
