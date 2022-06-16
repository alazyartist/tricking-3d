import React from "react";
import api, { apiPrivate } from "../api/api";
import { useUserStore } from "../store/userStore";
const useRefreshToken = () => {
	const setAccessToken = useUserStore((s) => s.setAccessToken);

	const refresh = async () => {
		const response = await apiPrivate.get("/refresh");
		console.log(response);
		setAccessToken(response.data.accessToken);
		return response.data.accessToken;
	};

	return refresh;
};

export default useRefreshToken;
