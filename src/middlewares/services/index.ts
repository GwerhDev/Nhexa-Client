import axios from "axios";
import { API_URL, STREAMBY_URL } from "../misc/const";
import { error } from "../misc/errors";

export const getAppList: any = async () => {
  const response: any = await axios.get(STREAMBY_URL + "/app-list", { withCredentials: true })
    .then(response => response.data)
    .catch(() => { return { error: error.api.loadItemById } });
  return response;
};

export const getMenuList: any = async () => {
  const response: any = await axios.get(STREAMBY_URL + "/menu-list")
    .then(response => response.data)
    .catch(() => { return { error: error.api.loadItemById } });
  return response;
};

export const getUserData: any = async () => {
  const response: any = await axios.get(API_URL + "/account", { withCredentials: true })
    .then(response => response.data)
  return response;
};