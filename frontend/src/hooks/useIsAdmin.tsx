import { useEffect, useState } from "react";
import { useUserStore } from "@store/userStore";
import { useUser } from "@clerk/nextjs";

const useIsAdmin = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const userInfo = useUserStore((s) => s.userInfo);
  const user = useUser();
  useEffect(() => {
    console.log(userInfo.isAdmin, "userInfo");
    console.log(user.user?.publicMetadata, "userClerk");
    if (userInfo?.isAdmin || user?.user?.publicMetadata?.isAdmin) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [userInfo, user]);

  return isAdmin;
};

export default useIsAdmin;
