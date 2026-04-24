import axios from "axios";
import api from "./api";
import { STREAMBY_URL } from "../misc/const";
import { error } from "../misc/errors";

export const getAppList: any = async () => {
  const response: any = await api.get("/app-list")
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
  const response: any = await api.get("/account")
    .then(response => response.data)
  return response;
};