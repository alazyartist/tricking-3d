import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./api";
import { useUserStore } from "../store/userStore";
interface RegisterProps {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}
const useRegister = () => {
  const setAccessToken = useUserStore((s) => s.setAccessToken);
  const setUser = useUserStore((s) => s.setUser);
  const queryClient = useQueryClient();
  return useMutation(
    ["register"],
    async (registerData: RegisterProps) => {
      const { data } = await api.post("/user", registerData, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      return data;
    },
    {
      onSuccess: (data) => {
        console.log("OnSuccess", data);
        setAccessToken(data?.data?.accessToken);
        setUser(data?.data?.username);
        queryClient.invalidateQueries(["userInfo"]);
      },
    }
  );
};

export default useRegister;
