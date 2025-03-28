import { API_URL } from "../middlewares/misc/const";

export const getUserToken = async () => {
  try {
    const res = await fetch(API_URL + "/session", {
      credentials: "include"
    });

    const { userToken } = await res.json() || {};
    return userToken;

  } catch (error) {
    console.log(error);
    return null;
  }
};

export const setUserToken = (token: any) => localStorage.setItem('userToken', token);

export const options = () => {
  return {
    headers: {
      Authorization: getUserToken()
    }
  }
};