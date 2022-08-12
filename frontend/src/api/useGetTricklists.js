import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useApiCreds from "../hooks/useApiCreds";
import { useUserStore } from "../store/userStore";

export const useGetTricklists = () => {
	const apiPrivate = useApiCreds();
	const { uuid } = useUserStore((s) => s.userInfo);
	const queryClient = useQueryClient();
	return useQuery(
		["tricklists"],
		async () => {
			const { data } = await apiPrivate.get(`/tricklist/${uuid}`);
			return data;
		},
		{
			onSuccess: () => {
				console.log("got the Tricklists");
			},
		}
	);
};

export const useGetTricklistById = (tricklist_id, uuid) => {
	const apiPrivate = useApiCreds();
	console.log(tricklist_id, uuid);
	const queryClient = useQueryClient();
	return useQuery(
		["tricklist", tricklist_id],
		async () => {
			const { data } = await apiPrivate.get(
				`/tricklist/${uuid}/${tricklist_id}`
			);
			return data;
		},
		{
			onSuccess: (data) => {
				console.log("got the TricklistsById", data);
			},
		}
	);
};
export const useGetTricklistDetailsById = (tricklist_id, user_id) => {
	const apiPrivate = useApiCreds();
	console.log(tricklist_id, "usegettricklist");
	const queryClient = useQueryClient();
	return useQuery(
		["tricklist details", tricklist_id],
		async () => {
			const { data } = await apiPrivate.get(
				`/tricklist/${user_id}/${tricklist_id}/combos`
			);
			return data;
		},
		{
			onSuccess: (data) => {
				console.log("got the TricklistsByIdDetails", data);
			},
		}
	);
};

export default useGetTricklists;
