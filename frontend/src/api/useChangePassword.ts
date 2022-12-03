import { useMutation } from "@tanstack/react-query";
import React from "react";
import useApiCreds from "../hooks/useApiCreds";
import { useUserStore } from "../store/userStore";
interface Passwords {
  oldPassword: string;
  newPassword: string;
  newPasswordCheck: string;
}
const useChangePassword = () => {
  const apiPrivate = useApiCreds();
  const uuid = useUserStore((s) => s.userInfo?.uuid);
  return useMutation(["changePassword"], async (passwords: Passwords) => {
    const { data } = await apiPrivate.put(
      `/user/${uuid}/changePassword`,
      { ...passwords },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  });
};

export default useChangePassword;
