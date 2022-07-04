import { isValidToken, getAuthStorage } from "./auth_token";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface LoggedinChilren {
  children: ReactNode;
}

export const IsLoggedIn = (children: LoggedinChilren): JSX.Element => {
  let isAuth = isValidToken();
  let authStorage = getAuthStorage();

  if (!authStorage) {
    return <Navigate to="/login" replace />;
  }

  if (isAuth) {
    return <>{children.children}</>;
  }

  return <Navigate to="/login?error=invalid+token" replace />;
};
