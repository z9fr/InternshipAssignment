import { useRoutes } from "react-router-dom";

// pages
import { Dashboard } from "./pages/dashboad";
import { UserLogin } from "./pages/login";

// auth
import { IsLoggedIn } from "./auth/isAuth";

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
  ]);

  return routes;
};
