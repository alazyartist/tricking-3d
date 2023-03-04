import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Group } from "next/dist/shared/lib/router/utils/route-regex";
import { useUserStore } from "../store/userStore";
import api from "./api";
interface Err extends Error {
  response?: { data?: { message?: string } };
}
interface LoginData {
  email: string;
  password: string;
}
export interface ReturnData {
  accessToken?: string;
  username?: string;
  profilePic?: string;
  first_name?: string;
  last_name?: string;
  message?: string;
  uuid?: string;
  data?: { message?: string };
}
export const useLogin = () => {
  const queryClient = useQueryClient();
  const setAccessToken = useUserStore((s) => s.setAccessToken);
  const setUser = useUserStore((s) => s.setUser);
  return useMutation<ReturnData, { response: ReturnData }, LoginData>(
    ["login"],
    async (loginData: LoginData) => {
      const { data } = await api.post(
        "/user/login",
        { ...loginData },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      return data;
    },
    {
      onSuccess: (data) => {
        console.log("OnSuccess", data);
        setAccessToken(data?.accessToken);
        setUser(data?.username);
        queryClient.invalidateQueries(["userInfo"]);
      },
    }
  );
};
export default useLogin;
