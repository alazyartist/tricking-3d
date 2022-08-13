import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useApiCreds from "../hooks/useApiCreds";
import { useUserStore } from "../store/userStore";

export const useCaptureUser = () => {
	const apiPrivate = useApiCreds();
	const queryClient = useQueryClient();
	const accessToken = useUserStore((s) => s.accessToken);

	return useMutation(
		["captureUser"],
		async (captureData) => {
			const { data } = await apiPrivate.post("/capture/", captureData, {
				withCredentials: true,
				headers: { "Content-Type": "application/json" },
			});
			return data;
		},
		{
			onSuccess: () => queryClient.invalidateQueries(["userInfo"]),
		}
	);
};
export default useCaptureUser;
