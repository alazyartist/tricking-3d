import { useQuery } from "@tanstack/react-query";
import useApiCreds from "../hooks/useApiCreds";

const useGetCombos = () => {
	const apiPrivate = useApiCreds();

	return useQuery(
		["Combos"],
		async () => {
			const { data } = await apiPrivate.get("/combo");
			return data;
		},
		{ onSuccess: (data) => console.log("I Got all them Combos.") }
	);
};
export const useGetComboById = (combo_id) => {
	const apiPrivate = useApiCreds();

	return useQuery(
		["Combo", combo_id],
		async () => {
			const { data } = await apiPrivate.get(`/combo/${combo_id}`);
			return data;
		},
		{ onSuccess: (data) => console.log("I Got all them Combos by ID.") }
	);
};

export default useGetCombos;
