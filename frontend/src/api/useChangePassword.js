import { useMutation } from "@tanstack/react-query";
import React from "react";
import useApiCreds from "../hooks/useApiCreds";
import { useUserStore } from "../store/userStore";

const useChangePassword = () => {
	const apiPrivate = useApiCreds();
	const uuid = useUserStore((s) => s.userInfo?.uuid);
	return useMutation(["changePassword"], async (passwords) => {
		const { data } = await apiPrivate.put(
			`/user/${uuid}/changePassword`,
			{ ...passwords },
			{
				withCredentials: true,
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		return data;
	});
};

export default useChangePassword;
