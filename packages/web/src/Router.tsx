import { useRoutes } from "react-router-dom";

// pages
import { Dashboard } from "./pages/dashboad";

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
  ]);

  return routes;
};
