import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserStore } from "../store/userStore";

function RequireAuth() {
	const accessToken = useUserStore((s) => s.accessToken);
	const location = useLocation();
	useEffect(() => {
		console.log(accessToken);
	}, []);
	return accessToken ? (
		<Outlet />
	) : (
		<Navigate to='/login' state={{ from: location }} replace={true} />
	);
}

export default RequireAuth;
