import { useMutation, useQueryClient } from "@tanstack/react-query";
import useApiCreds from "../hooks/useApiCreds";
import { useUserStore } from "../store/userStore";

export const useUpdateProfileInfo = () => {
  const apiPrivate = useApiCreds();
  const queryClient = useQueryClient();
  const userInfo = useUserStore((s) => s.userInfo);

  return useMutation(
    ["updateProfileInfo"],
    async (formData) => {
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
