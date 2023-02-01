import React from "react";
import api, { apiPrivate } from "../api/api";
import { useUserStore } from "../store/userStore";
import useLogout from "./useLogout";
const useRefreshToken = () => {
  const setAccessToken = useUserStore((s) => s.setAccessToken);
  const accessToken = useUserStore((s) => s.accessToken);
  const logout = useLogout();
  const refresh = async () => {
    api.defaults.withCredentials = true;
    const res = await api
      .get("/refresh", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        setAccessToken(response.data.accessToken);
        console.log("refreshResponse", response.data.accessToken);
        return response.data.accessToken;
      })
      .catch((err) => {
        setAccessToken(null);
        logout();
        console.log("refreshErr", err);
      });
    return res;
  };

  return refresh;
};

export default useRefreshToken;
