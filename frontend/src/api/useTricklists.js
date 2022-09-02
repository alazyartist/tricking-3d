import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useApiCreds from "../hooks/useApiCreds";
import { useUserStore } from "../store/userStore";

export const useGetTricklists = (uuid) => {
	const apiPrivate = useApiCreds();

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
export const useGetCombos = () => {
	const apiPrivate = useApiCreds();
	const queryClient = useQueryClient();
	return useQuery(
		["combos"],
		async () => {
			const { data } = await apiPrivate.get(`combo`, {});
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
export const useAddCombo = (tricklist_id, user_id, combo_id) => {
	const apiPrivate = useApiCreds();
	const queryClient = useQueryClient();
	return useMutation(
		["addComboToTricklist"],
		async (data) => {
			return apiPrivate.post(`/tricklist/user/${tricklist_id}`, { data });
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["tricklist details", tricklist_id]);
				console.log("succeeded making new list");
			},
		}
	);
};
export const useDeleteTricklist = (tricklist_id) => {
	const apiPrivate = useApiCreds();
	const queryClient = useQueryClient();
	return useMutation(
		["deleteTricklist"],
		async (data) => {
			return apiPrivate.delete(`/tricklist/user/${tricklist_id}`, { data });
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["tricklists"]);
				console.log("succeeded making new list");
			},
		}
	);
};
export const useDeleteCombo = () => {
	const apiPrivate = useApiCreds();
	const queryClient = useQueryClient();
	return useMutation(
		["deleteComboFromTricklist"],
		async (listItem) => {
			return apiPrivate.delete(
				`/tricklist/user/${listItem.tricklist_id}/${listItem.combo_id}/${listItem.id}`
			);
		},
		{
			onSuccess: (data) => {
				console.log(data);
				queryClient.invalidateQueries([
					"tricklist details",
					data.data.tricklist_id,
				]);
				console.log(
					"succeeded deleteing " + data.data.tricklist_id + " from list"
				);
			},
		}
	);
};

export default useGetTricklists;
