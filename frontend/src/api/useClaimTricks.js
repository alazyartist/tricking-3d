import { useMutation, useQueryClient } from "@tanstack/react-query";
import useApiCreds from "../hooks/useApiCreds";
import { useUserStore } from "../store/userStore";

export const useClaimTrick = () => {
	const apiPrivate = useApiCreds();
	const queryClient = useQueryClient();
	const userInfo = useUserStore((s) => s.userInfo);

	return useMutation(
		["claimTrick"],
		async (formData) => {
			const { data } = await apiPrivate.post("user/claimTrick", formData, {
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
export const useUnClaimTrick = () => {
	const apiPrivate = useApiCreds();
	const queryClient = useQueryClient();
	const userInfo = useUserStore((s) => s.userInfo);

	return useMutation(
		["unclaimTrick"],
		async ({ user_id, trick_id }) => {
			const { data } = await apiPrivate.delete(
				`user/unclaimTrick/${user_id}/${trick_id}`,
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
