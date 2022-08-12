import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useApiCreds from "../hooks/useApiCreds";
import { useUserStore } from "../store/userStore";

const useMakeTricklist = () => {
	const apiPrivate = useApiCreds();
	const queryClient = useQueryClient();
	return useMutation(
		["makeTricklist"],
		async (data) => {
			return apiPrivate.post("/tricklist", { data });
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries("userInfo");
				console.log("succeeded making new list");
			},
		}
	);
};

export default useMakeTricklist;
