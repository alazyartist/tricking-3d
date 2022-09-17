import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useApiCreds from "../hooks/useApiCreds";

export const useGetTricklists = (uuid) => {
	const apiPrivate = useApiCreds();

	return useQuery(
		["tricklists"],
		async () => {
			const { data } = await apiPrivate.get(`/tricklist/${uuid}`);
			return data;
		},
		{
			onSuccess: () => {},
		}
	);
};
export const useGetCombos = () => {
	const apiPrivate = useApiCreds();
	return useQuery(
		["combos"],
		async () => {
			// @TODO: Does this need to pass a uuid?
			const { data } = await apiPrivate.get(`combo`, {});
			return data;
		},
		{
			onSuccess: () => {},
		}
	);
};

export const useGetTricklistById = (tricklist_id, uuid) => {
	const apiPrivate = useApiCreds();
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
				// console.log("got the TricklistsById", data);
			},
		}
	);
};
export const useGetTricklistDetailsById = (tricklist_id, user_id) => {
	const apiPrivate = useApiCreds();
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
				// console.log("got the TricklistsByIdDetails", data);
			},
		}
	);
};
export const useAddCombo = (tricklist_id) => {
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
				queryClient.invalidateQueries(["tricklists"]);
				queryClient.invalidateQueries(["combos"]);
				console.log("AddedCombo");
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
				queryClient.invalidateQueries([ "tricklists" ]);
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
