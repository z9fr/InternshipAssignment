import { IAuthTokenStore, IDecodedToken } from "../types/authToken";
import jwt_decode from "jwt-decode";

export const isValidToken = (): Boolean => {
  let values = getAuthStorage();

  if (!values) return false;

  const decodedToken: IDecodedToken = jwt_decode(values?.token);

  if (decodedToken.exp * 1000 < Date.now()) {
    return false;
  }
  return true;
};

export const getAuthStorage = (): IAuthTokenStore => {
  let values: IAuthTokenStore = JSON.parse(localStorage.getItem("auth")!);
  return values;
};
