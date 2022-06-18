import React from "react";
import api, { apiPrivate } from "../api/api";
import { useUserStore } from "../store/userStore";
const useRefreshToken = () => {
	const setAccessToken = useUserStore((s) => s.setAccessToken);
	const accessToken = useUserStore((s) => s.accessToken);

	const refresh = async () => {
		api.defaults.withCredentials = true;
		api
			.get(
				"/refresh",
				{},
				{
					headers: {
						"Content-Type": "application/json",
					},
					withCredentials: true,
				}
			)
			.then((response) => {
				setAccessToken(response.data.accessToken);
				console.log("refreshResponse", response.data.accessToken);
				return response.data.accessToken;
			})
			.catch((err) => console.log("refreshErr", err));
	};

	return refresh;
};

export default useRefreshToken;
