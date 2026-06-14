import axios from "axios";
import api from "./api";
import { STREAMBY_URL } from "../misc/const";
import { error } from "../misc/errors";

export const getNhexaEnv: any = async () => {
  const raw: any[] = await axios.get(STREAMBY_URL + "/nhexa-environment", { withCredentials: true })
    .then(response => response.data)
    .catch(() => []);
  return raw.map((cat: any) => ({
    id: cat._id,
    name: cat._name,
    apps: Object.entries(cat)
      .filter(([k]) => /^\d+$/.test(k))
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([, v]) => v),
  }));
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