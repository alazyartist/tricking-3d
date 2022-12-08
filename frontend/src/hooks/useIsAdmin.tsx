import { useEffect, useState } from "react";
import { useUserStore } from "@store/userStore";

const useIsAdmin = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const userInfo = useUserStore((s) => s.userInfo);
  useEffect(() => {
    if (
      userInfo?.uuid === "admin696-8c94-4ca7-b163-9alazyartist" ||
      userInfo?.uuid === "baf6a9c6-432f-4a08-8260-717249d5b71c" ||
      userInfo?.uuid === "admin696-8c94-4ca7-b163-969420Tohzt"
    ) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [userInfo]);

  return isAdmin;
};

export default useIsAdmin;
