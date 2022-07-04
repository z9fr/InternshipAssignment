import { config as AppConfig } from "../../config";
import { useQuery } from "react-query";
import httpClient from "../../http-common";

const fetchNotes = () =>
  httpClient.get(`${AppConfig.apiUrl}notes/`).then((response) => response.data);

export const useNotes = () => {
  return useQuery("notes", fetchNotes);
};
