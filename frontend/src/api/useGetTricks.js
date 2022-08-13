import { useQuery } from "@tanstack/react-query";
import useApiCreds from "../hooks/useApiCreds";

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

export default useGetTricks;
