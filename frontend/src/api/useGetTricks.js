import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useApiCreds from "../hooks/useApiCreds";
import { useUserStore } from "../store/userStore";

const useGetTricks = () => {
	const apiPrivate = useApiCreds();

	return useQuery(
		["tricks"],
		async () => {
			const { data } = await apiPrivate.get("/tricks");
			return data;
		},
		{ onSuccess: (data) => console.log("I Got all them Tricks.") }
	);
};
export const useGetTrickParts = () => {
	const apiPrivate = useApiCreds();

	return useQuery(
		["trickParts"],
		async () => {
			const { data } = await apiPrivate.get("/tricks/parts");
			return data;
		},
		{
			onSuccess: (data) => {
				console.log("I Got all them TricksParts.");
			},
		}
	);
};
export const useGetTrickPoints = () => {
	const apiPrivate = useApiCreds();
	const queryClient = useQueryClient();

	return useQuery(
		["trickPoints"],
		async () => {
			const { data } = await apiPrivate.get("/tricks/points");
			return data;
		},
		{
			onSuccess: (data) => {
				console.log("I Got all them TricksPoints.", data);
				queryClient.invalidateQueries(["tricks"]);
				queryClient.invalidateQueries(["trickParts"]);
			},
		}
	);
};
export const useGetTricksById = (trick_id) => {
	const apiPrivate = useApiCreds();

	return useQuery(
		["trick", trick_id],
		async () => {
			const { data } = await apiPrivate.get(`/tricks/${trick_id}`);
			return data;
		},
		{ onSuccess: (data) => console.log("I Got all them Tricks by ID.") }
	);
};

export const useSaveTrick = (trickInfo) => {
	const apiPrivate = useApiCreds();
	const userInfo = useUserStore((s) => s.userInfo);
	const queryClient = useQueryClient();

	return useMutation(
		["saveTrick"],
		async (data) => {
			return apiPrivate.post(`/tricks`, { ...data, useruuid: userInfo.uuid });
		},
		{
			onSuccess: (data) => {
				queryClient.invalidateQueries(["tricks"]);
				queryClient.invalidateQueries(["trickParts"]);
				queryClient.invalidateQueries(["trickPoints"]);
				console.log("SavedTrick", data);
			},
		}
	);
};

export const useUpdateTrickPoints = (trickInfo) => {
	const apiPrivate = useApiCreds();
	const userInfo = useUserStore((s) => s.userInfo);
	const queryClient = useQueryClient();

	return useMutation(
		["updateTrickPoints"],
		async (data) => {
			return apiPrivate.put(`/tricks/parts`, { ...data });
		},
		{
			onSuccess: (data) => {
				queryClient.invalidateQueries(["trickParts"]);
				queryClient.invalidateQueries(["tricks"]);
				queryClient.invalidateQueries(["trickPoints"]);
				console.log("SavedTrick", data);
			},
		}
	);
};

export default useGetTricks;
