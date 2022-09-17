import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useUserInfo from "../api/useUserInfo";
import useLocalStorage from "../hooks/useLocalStorage";
import useRefreshToken from "../hooks/useRefreshToken";
import { useUserStore } from "../store/userStore";

const PersistLogin = () => {
	const [isLoading, setIsLoading] = useState(true);
	const accessToken = useUserStore((s) => s.accessToken);
	const user = useUserStore((s) => s.user);
	const persist = useLocalStorage("persist", false);
	const refresh = useRefreshToken();

	useEffect(() => {
		let isMounted = true;
		const verifyRefreshToken = async () => {
			try {
				await refresh();
			} catch (err) {
				console.log(err);
			} finally {
				isMounted && setIsLoading(false);
			}
		};
		!accessToken ? verifyRefreshToken() : setIsLoading(false);
		return () => (isMounted = false);
	}, []);

	return (
		<>{!persist ? <Outlet /> : isLoading ? <p>Loading ...</p> : <Outlet />}</>
	);
};

export default PersistLogin;
