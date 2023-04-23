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
import PrivateRoutes from "./utils/PrivateRoutes";
import { UpdateScores, UpdateStats } from "./pages/Accounts/Update";
import AccountSettings from "./pages/Accounts/AccountSettings.js";

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
        loader: () =>
          import("./pages/Home/Home").then((module) => module.loader()),
      },
      {
        path: "fixtures",
        element: <Fixtures />,
        loader: () =>
          import("./pages/Fixtures/Fixtures").then((module) => module.loader()),
      },
      {
        path: "account",
        element: <Accounts />,
        loader: () =>
          import("./pages/Accounts/Accounts").then((module) => module.loader()),
        children: [
          {
            path: "settings",
            element: <AccountSettings />,
          },
          {
            path: "delete-account",
            element: <UpdateStats />,
          },
          {
            element: <PrivateRoutes />,
            loader: () =>
              import("./utils/PrivateRoutes").then((module) =>
                module.loader("loader")
              ),
            children: [
              {
                path: "update-scores",
                element: <UpdateScores />,
                loader: () =>
                  import("./pages/Accounts/Update").then((module) =>
                    module.loader("getScoresToUpdate")
                  ),
              },
              {
                path: "update-statistics",
                element: <UpdateStats />,
                loader: () =>
                  import("./pages/Accounts/Update").then((module) =>
                    module.loader("getStatsToUpdate")
                  ),
              },
              {
                path: "manage-users",
                element: <ManageUser />,
                loader: () =>
                  import("./pages/Accounts/ManageUser").then((module) =>
                    module.loader()
                  ),
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
