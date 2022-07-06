import { useRoutes } from "react-router-dom";

// pages
import { Dashboard } from "./pages/dashboad";
import { UserLogin } from "./pages/login";
import { UserInformation } from "./pages/userInformation";
import { Verify } from "./pages/verify";

// auth
import { IsLoggedIn, IsAdmin } from "./auth/isAuth";

// layout
import Layout from "./layouts";

export const ApplicationRouter = () => {
  let routes = useRoutes([
    {
      path: "/",
      element: (
        <IsLoggedIn>
          <Layout showSiderbar={false}>
            <Dashboard />
          </Layout>
        </IsLoggedIn>
      ),
    },
    {
      path: "/login",
      element: <UserLogin />,
    },

    {
      path: "/verify",
      element: <Verify />,
    },

    {
      path: "/users",
      element: (
        <IsLoggedIn>
          <IsAdmin>
            <Layout showSiderbar={false}>
              <UserInformation />
            </Layout>
          </IsAdmin>
        </IsLoggedIn>
      ),
    },
  ]);

  return routes;
};
