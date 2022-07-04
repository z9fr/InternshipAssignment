import { useRoutes } from "react-router-dom";

// pages
import { Dashboard } from "./pages/dashboad";
import { UserLogin } from "./pages/login";

// layout
import Layout from "./layouts";

export const ApplicationRouter = () => {
  let routes = useRoutes([
    {
      path: "/",
      element: (
        <Layout showSiderbar={false}>
          <Dashboard />
        </Layout>
      ),
    },
    {
      path: "/login",
      element: <UserLogin />,
    },
  ]);

  return routes;
};
