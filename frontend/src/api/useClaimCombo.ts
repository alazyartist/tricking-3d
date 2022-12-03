import { useMutation, useQueryClient } from "@tanstack/react-query";
import useApiCreds from "../hooks/useApiCreds";
import { useUserStore } from "../store/userStore";
interface ClaimComboProps {
  user_id: string;
  combo_id: string;
}
export const useClaimCombo = () => {
  const apiPrivate = useApiCreds();
  const queryClient = useQueryClient();
  const userInfo = useUserStore((s) => s.userInfo);

  return useMutation(
    ["claimCombo"],
    async (formData: ClaimComboProps) => {
      const { data } = await apiPrivate.post("user/claimCombo", formData, {
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

export const useUnClaimCombo = () => {
  const apiPrivate = useApiCreds();
  const queryClient = useQueryClient();
  const userInfo = useUserStore((s) => s.userInfo);

  return useMutation(
    ["unclaimCombo"],
    async ({ user_id, combo_id }: ClaimComboProps) => {
      const { data } = await apiPrivate.delete(
        `user/unclaimCombo/${user_id}/${combo_id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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
