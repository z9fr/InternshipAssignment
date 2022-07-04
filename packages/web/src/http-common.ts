import axios from "axios";
import { config } from "./config";
import { getAuthStorage } from "./auth/auth_token";

const authStorage = getAuthStorage();

export default axios.create({
  baseURL: config.apiUrl,
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${authStorage?.token}`,
  },
});
