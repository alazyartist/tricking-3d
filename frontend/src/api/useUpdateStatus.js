import { useMutation, useQueryClient } from "@tanstack/react-query";
import useApiCreds from "../hooks/useApiCreds";

export const useUpdateStatus = () => {
	const apiPrivate = useApiCreds();
	const queryClient = useQueryClient();

	return useMutation(
		["updateStatus"],
		async (formData) => {
			const { data } = await apiPrivate.put("user/profile/status", formData, {
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
