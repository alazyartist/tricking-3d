import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserStore } from "../../store/userStore";

function RequireAuth() {
	const user = useUserStore((s) => s.user);
	const location = useLocation();
	useEffect(() => {
		console.log(location);
		console.log(user);
	}, []);
	return user ? (
		<Outlet />
	) : (
		<Navigate to='/login' state={{ from: location }} replace={true} />
	);
}

export default RequireAuth;
