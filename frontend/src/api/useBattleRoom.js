import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useApiCreds from "../hooks/useApiCreds";
import { useUserStore } from "../store/userStore";

const useBattleRoomSetup = () => {
	const apiPrivate = useApiCreds();
	const queryClient = useQueryClient();
	return useMutation(
		["makeBattleRoom"],
		async (data) => {
			return apiPrivate.post("/battlerooms", { data });
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["BattleRooms"]);
				console.log("succeeded saving BattleRoom setup");
			},
		}
	);
};
export const useBattleRoomClose = (sessionid) => {
	const apiPrivate = useApiCreds();
	const queryClient = useQueryClient();
	return useMutation(
		["closeBattleRoom"],
		async (data) => {
			return apiPrivate.put(`/battlerooms/${sessionid}`, { data });
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["BattleRooms"]);
				console.log("closeBattleRoom");
			},
		}
	);
};
export const useBattleRoomUpdate = (sessionid) => {
	const apiPrivate = useApiCreds();
	const queryClient = useQueryClient();
	return useMutation(
		["updateBattleRoom"],
		async (data) => {
			return apiPrivate.post(`/battlerooms/${sessionid}`, { data });
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["BattleRooms"]);
				console.log("updateBattleRoomStats");
			},
		}
	);
};
export const useGetBattleRooms = () => {
	const apiPrivate = useApiCreds();
	return useQuery(["BattleRooms"], async () => {
		const { data } = await apiPrivate.get("/battlerooms", {
			withCredentials: true,
		});
		return data;
	});
};
export const useGetBattleRoombySessionid = (sessionid) => {
	const apiPrivate = useApiCreds();
	return useQuery(["BattleRoom", sessionid], async () => {
		const { data } = await apiPrivate.get(`/battlerooms/${sessionid}`, {
			withCredentials: true,
		});
		return data;
	});
};

export default useBattleRoomSetup;
