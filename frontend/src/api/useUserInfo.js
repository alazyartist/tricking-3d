import { useQuery } from "@tanstack/react-query";
import useApiCreds from "../hooks/useApiCreds";
import { useUserStore } from "../store/userStore";

const useUserInfo = () => {
	const apiPrivate = useApiCreds();
	const setUserInfo = useUserStore((s) => s.setUserInfo);
	return useQuery(
		["userInfo"],
		async () => {
			const { data } = await apiPrivate.get("/user/getInfo");
			return data;
		},
		{ onSuccess: (data) => setUserInfo(data) }
	);
};

export default useUserInfo;
