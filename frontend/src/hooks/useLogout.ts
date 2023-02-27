import api from "../api/api";
import useApiCreds from "./useApiCreds";
import { useUserStore } from "../store/userStore";

function useLogout() {
  const setUser = useUserStore((s) => s.setUser);
  const setUserInfo = useUserStore((s) => s.setUserInfo);
  const setAccessToken = useUserStore((s) => s.setAccessToken);
  // const nav = useNavigate();
  // const apiPrivate = useApiCreds();
  const logout = async () => {
    const response = await api.get("/logout", {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    // console.log("logoutRes", response);
    setUser(null);
    setAccessToken(null);
    setUserInfo(null);
  };

  return logout;
}

export default useLogout;
