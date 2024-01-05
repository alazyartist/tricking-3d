import { AxiosError, AxiosRequestConfig } from "axios";
import { useEffect } from "react";
import { apiPrivate } from "../api/api";
import { useUserStore } from "../store/userStore";
import useRefreshToken from "./useRefreshToken";
const useApiCreds = () => {
  const refresh = useRefreshToken();
  const accessToken = useUserStore((s) => s.accessToken);

  useEffect(() => {
    const requestIntercept = apiPrivate.interceptors.request.use(
      (config: AxiosRequestConfig<any>): AxiosRequestConfig<any> => {
        if (!config?.headers?.["Authorization"]) {
          config.headers = { Authorization: `Bearer ${accessToken}` };
        }
        // console.log(config);
        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );

    const responseIntercept = apiPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        // console.log("prevReq", prevRequest);
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          prevRequest.withCredentials = true;
          await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          return apiPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      apiPrivate.interceptors.request.eject(requestIntercept);
      apiPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [accessToken, refresh]);

  return apiPrivate;
};

export default useApiCreds;
