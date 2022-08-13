import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useApiCreds from "../hooks/useApiCreds";
import { useUserStore } from "../store/userStore";

export const useInteraction = () => {
	const queryClient = useQueryClient();
	const apiPrivate = useApiCreds();
	const { uuid } = useUserStore((s) => s.userInfo);
	return useMutation(
		["interact"],
		async (comment) => {
			return apiPrivate.post("/user/interact", { ...comment });
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["interaction"]);
				console.log("interacted with react-query");
			},
		}
	);
};
export const useDeleteInteraction = () => {
	const queryClient = useQueryClient();
	const apiPrivate = useApiCreds();
	const { uuid } = useUserStore((s) => s.userInfo);
	return useMutation(
		["interact"],
		async (interaction_id) => {
			return apiPrivate.delete(`/user/comments/${interaction_id}`);
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["interaction"]);
				console.log("interacted with react-query");
			},
		}
	);
};

export const useGetInteractions = (trick_id) => {
	const apiPrivate = useApiCreds();

	return useQuery(
		["interaction", trick_id],
		async () => {
			const { data } = await apiPrivate.get(`/user/comments/${trick_id}`);
			return data;
		},
		{
			onSuccess: () => {
				console.log("gotInteractions");
			},
		}
	);
};
