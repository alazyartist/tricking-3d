import { useMutation, useQueryClient } from "@tanstack/react-query";
import useApiCreds from "../hooks/useApiCreds";

export const useClaimCombo = () => {
	const apiPrivate = useApiCreds();
	const queryClient = useQueryClient();

	return useMutation(
		["claimCombo"],
		async (formData) => {
			const { data } = await apiPrivate.put("user/claimCombo", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
					"Content-Type": "application/json",
				},
			});
			return data;
		},
		{
			onSuccess: () => queryClient.invalidateQueries(["userInfo"]),
		}
	);
};
