import React, { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import useRefreshToken from "../hooks/useRefreshToken";
import { useUserStore } from "../store/userStore";

const PersistLogin = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = useUserStore((s) => s.accessToken);
  const persist = useLocalStorage("persist", false);
  const refresh = useRefreshToken();
  //@ts-ignore
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
    <>
      {!persist ? { children } : isLoading ? <p>Loading ...</p> : { children }}
    </>
  );
};

export default PersistLogin;
