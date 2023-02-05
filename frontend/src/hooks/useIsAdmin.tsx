import { useEffect, useState } from "react";
import { useUserStore } from "@store/userStore";

const useIsAdmin = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const userInfo = useUserStore((s) => s.userInfo);
  useEffect(() => {
    console.log(userInfo.isAdmin);
    if (userInfo?.isAdmin) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [userInfo]);

  return isAdmin;
};

export default useIsAdmin;
