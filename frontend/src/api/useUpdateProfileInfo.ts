import { useMutation, useQueryClient } from "@tanstack/react-query";
import useApiCreds from "../hooks/useApiCreds";
import { useUserStore } from "../store/userStore";
interface ProfileInfo {
  username: string;
  name: string;
  country: string;
  city: string;
  state: string;
  age: number;
  uuid: string;
}
export const useUpdateProfileInfo = () => {
  const apiPrivate = useApiCreds();
  const queryClient = useQueryClient();
  const userInfo = useUserStore((s) => s.userInfo);

  return useMutation(
    ["updateProfileInfo"],
    async (formData: ProfileInfo) => {
      const { data } = await apiPrivate.put("user/profile/", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["userInfo"]);
        queryClient.invalidateQueries(["userInfoByUUID", userInfo?.uuid]);
      },
    }
  );
};
