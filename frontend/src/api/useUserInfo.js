import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
export const useChangeProfilePic = () => {
	const apiPrivate = useApiCreds();
	const queryClient = useQueryClient();

	return useMutation(
		["changeProfilePic"],
		async (formData) => {
			const { data } = await apiPrivate.post(
				"loggedIn/user/profilePic",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						"Content-Type": "application/json",
					},
				}
			);
			return data;
		},
		{
			onSuccess: () => queryClient.invalidateQueries(["userInfo"]),
		}
	);
};

export default useUserInfo;
