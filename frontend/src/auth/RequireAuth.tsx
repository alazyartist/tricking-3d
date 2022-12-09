import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useUserStore } from "../store/userStore";

function RequireAuth({ children }) {
  const accessToken = useUserStore((s) => s.accessToken);
  const nav = useRouter();
  useEffect(() => {
    console.log(accessToken);
  }, []);
  return <>{accessToken ? { children } : nav.push("/login")}</>;
}

export default RequireAuth;
