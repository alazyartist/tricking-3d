import { useQuery } from "@tanstack/react-query";
import React from "react";
import useApiCreds from "../hooks/useApiCreds";
import { useUserStore } from "../store/userStore";

const useUserInfoByUUID = (uuid: string) => {
  const apiPrivate = useApiCreds();
  return useQuery(
    ["userInfoByUUID", uuid],
    async () => {
      const { data } = await apiPrivate.get(`/user/getInfo/${uuid}`);
      return data;
    }
    // { onSuccess: (data) => console.log(data) }
  );
};
export default useUserInfoByUUID;
