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

export default useBattleRoomSetup;
