import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSessionSummariesStore } from "../admin/components/sessionreview/SessionSummaryStore";
import useApiCreds from "../hooks/useApiCreds";

export const useSubmitSessionForReview = () => {
  const apiPrivate = useApiCreds();
  const queryClient = useQueryClient();
  return useMutation(
    ["submitSessionSummaries"],
    async (data: {}) => {
      return apiPrivate.post("/sessionsummaries", {
        ...data,
      });
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["userInfo"]);
        queryClient.invalidateQueries(["sessionsummaries"]);
        console.log("succeeded submiting SessionSummary for Review", data);
      },
    }
  );
};
interface SessionDataType {
  sessionData?: any | any[];
  data?: any | any[];
  status?: string;
  sessionid?: string;
}
export const useSaveSessionDetails = () => {
  const apiPrivate = useApiCreds();
  const queryClient = useQueryClient();
  return useMutation(
    ["saveSessionDetails"],
    async (props: SessionDataType) => {
      return apiPrivate.post(`/sessionsummaries/${props.sessionid}`, {
        ...(props.data || props.sessionData),
      });
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["userProfile"]);
        queryClient.invalidateQueries(["sessionsummaries"]);
        console.log("succeeded submiting SessionDetails", data);
      },
    }
  );
};
export const useChangeSessionStatus = () => {
  const apiPrivate = useApiCreds();
  const queryClient = useQueryClient();
  const sessionid = useSessionSummariesStore((s) => s.sessionid);
  return useMutation(
    ["changeseSessionStatus"],
    async (status: string) => {
      return apiPrivate.put(`/sessionsummaries/${sessionid}`, {
        status,
        sessionid,
      });
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["sessionsummaries"]);
        console.log("succeeded submiting SessionDetails", data);
      },
    }
  );
};
export const useChangeSessionStatusById = (sessionid: string) => {
  const apiPrivate = useApiCreds();
  const queryClient = useQueryClient();
  // const sessionid = useSessionSummariesStore((s) => s.sessionid);
  return useMutation(
    ["changeseSessionStatusbyId"],
    async (status: string) => {
      console.log(status, sessionid);
      return apiPrivate.put(`/sessionsummaries/${sessionid}`, {
        status,
        sessionid,
      });
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["sessionsummaries"]);
        console.log("succeeded submiting SessionDetailsbyId", data);
      },
    }
  );
};

export const useGetAllSessions = () => {
  const apiPrivate = useApiCreds();
  const queryClient = useQueryClient();
  return useQuery(["sessionsummaries"], async () => {
    return apiPrivate.get("/sessionsummaries");
  });
};
export const useGetSessionDetailsbySessionid = (sessionid, initialData) => {
  const apiPrivate = useApiCreds();
  const queryClient = useQueryClient();
  return useQuery(
    ["sessionsummaries"],
    async () => {
      return apiPrivate.get(`/sessionsummaries/${sessionid}`);
    },
    { initialData: initialData }
  );
};
