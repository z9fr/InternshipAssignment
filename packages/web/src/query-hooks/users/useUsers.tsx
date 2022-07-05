import { config as AppConfig } from "../../config";
import { useQuery } from "react-query";
import httpClient from "../../http-common";

const fetchUsers = () =>
  httpClient
    .get(`${AppConfig.apiUrl}users/all`)
    .then((response) => response.data);

export const useUsers = () => {
  return useQuery("users", fetchUsers);
};
