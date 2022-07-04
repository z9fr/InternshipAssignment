import { useRoutes } from "react-router-dom";

// pages
import { Dashboard } from "./pages/dashboad";

export const ApplicationRouter = () => {
  let routes = useRoutes([
    {
      path: "/",
      element: <Dashboard />,
    },
  ]);

  return routes;
};
