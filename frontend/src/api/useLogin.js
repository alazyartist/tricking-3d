import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "../store/userStore";
import api from "./api";
export const useLogin = () => {
	const queryClient = useQueryClient();
	const setAccessToken = useUserStore((s) => s.setAccessToken);
	const setUser = useUserStore((s) => s.setUser);

	return useMutation(
		["login"],
		async (loginData) => {
			const { data } = api.post(
				"/user/login",
				{ ...loginData },
				{
					withCredentials: true,
					headers: { "Content-Type": "application/json" },
				}
			);
			return data;
		},
		{
			onSuccess: (response) => {
				console.log(response);
				setUser(response.data.username);
				setAccessToken(response.data.accessToken);
				queryClient.invalidateQueries(["userInfo"]);
			},
		}
	);
};
export default useLogin;
