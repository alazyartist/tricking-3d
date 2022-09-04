import { useMutation, useQueryClient } from "@tanstack/react-query";
import useApiCreds from "../hooks/useApiCreds";
import { useUserStore } from "../store/userStore";

export const useClaimCombo = () => {
	const apiPrivate = useApiCreds();
	const queryClient = useQueryClient();
	const userInfo = useUserStore((s) => s.userInfo);

	return useMutation(
		["claimCombo"],
		async (formData) => {
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
		async ({ user_id, combo_id }) => {
			const { data } = await apiPrivate.delete(
				`user/unclaimCombo/${user_id}/${combo_id}`,
				{
					headers: {
						"Content-Type": "multipart/form-data",
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
