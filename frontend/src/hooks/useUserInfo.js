import React from "react";
import { useUserStore } from "../store/userStore";
import useApiCreds from "./useApiCreds";

const useUserInfo = () => {
	const setUserInfo = useUserStore((s) => s.setUserInfo);
	const apiPrivate = useApiCreds();
	const getInfo = async () => {
		const response = await apiPrivate.get("/user/getInfo", {});
		setUserInfo(response.data);
		return response;
	};

	return getInfo;
};

export default useUserInfo;
