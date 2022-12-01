import { useQuery } from "@tanstack/react-query";
import useApiCreds from "../hooks/useApiCreds";

const useGetAllUsers = () => {
	const apiPrivate = useApiCreds();
	return useQuery(["allUsers"], async () => {
		const { data } = await apiPrivate.get("/user", { withCredentials: true });
		return data;
	});
};

export default useGetAllUsers;
