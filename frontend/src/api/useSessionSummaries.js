import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useApiCreds from "../hooks/useApiCreds";

export const useSubmitSessionForReview = () => {
	const apiPrivate = useApiCreds();
	const queryClient = useQueryClient();
	return useMutation(
		["submitSessionSummaries"],
		async (data) => {
			return apiPrivate.post("/sessionsummaries", {
				...data,
			});
		},
		{
			onSuccess: (data) => {
				queryClient.invalidateQueries(["sessionsummaries"]);
				console.log("succeeded submiting SessionSummary for Review", data);
			},
		}
	);
};
