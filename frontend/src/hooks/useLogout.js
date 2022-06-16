import React from "react";
import { useUserStore } from "../store/userStore";

function useLogout() {
	const setUser = useUserStore((s) => s.setUser);
	const setAccessToken = useUserStore((s) => s.setAccessToken);
	const logout = () => {
		setUser(null);
		setAccessToken(null);
	};

	return logout;
}

export default useLogout;
