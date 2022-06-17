import React from "react";
import api, { apiPrivate } from "../api/api";
import { useUserStore } from "../store/userStore";
const useRefreshToken = () => {
	const setAccessToken = useUserStore((s) => s.setAccessToken);

	const refresh = async () => {
		api
			.get(
				"/refresh",
				{},
				{
					headers: { "Content-Type": "application/json" },
					withCredentials: true,
				}
			)
			.then((response) => {
				setAccessToken(response.data.accessToken);
				console.log(response);
				return response.data.accessToken;
			})
			.catch((err) => console.log(err));
	};

	return refresh;
};

export default useRefreshToken;
