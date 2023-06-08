import api from "../api/api";
import useApiCreds from "./useApiCreds";
import { useClerk } from "@clerk/nextjs";
import { useUserStore } from "../store/userStore";
import mixpanel from "@utils/mixpanel";

function useLogout() {
  const { signOut } = useClerk();
  const setUser = useUserStore((s) => s.setUser);
  const setUserInfo = useUserStore((s) => s.setUserInfo);
  const setAccessToken = useUserStore((s) => s.setAccessToken);
  // const nav = useNavigate();
  // const apiPrivate = useApiCreds();
  const logout = async () => {
    // const response = await api.get("/logout", {
    //   headers: { "Content-Type": "application/json" },
    //   withCredentials: true,
    // });
    signOut();
    // console.log("logoutRes", response);
    setUser(null);
    setAccessToken(null);
    setUserInfo(null);
    mixpanel.track("Logout");
    mixpanel.reset();
  };

  return logout;
}

export default useLogout;
