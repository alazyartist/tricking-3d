import React from "react";
import useApiCreds from "./useApiCreds";

const useUserInfo = () => {
	const apiPrivate = useApiCreds();
	const getInfo = async () => {
		const response = await apiPrivate.get("/user/getInfo", {});
		return response;
	};

	return getInfo;
};

export default useUserInfo;
