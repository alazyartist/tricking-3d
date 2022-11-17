import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSessionSummariesStore } from "../admin/components/sessionreview/SessionSummaryStore";
import useApiCreds from "../hooks/useApiCreds";

export const useSubmitSessionForReview = () => {
	const apiPrivate = useApiCreds();
	const queryClient = useQueryClient();
	return useMutation(
		["submitSessionSummaries"],
		async (data) => {
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
export const useSaveSessionDetails = () => {
	const apiPrivate = useApiCreds();
	const queryClient = useQueryClient();
	return useMutation(
		["saveSessionDetails"],
		async (data, sessionid) => {
			return apiPrivate.post(`/sessionsummaries/${sessionid}`, {
				...data,
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
		async (status) => {
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

export const useGetAllSessions = () => {
	const apiPrivate = useApiCreds();
	const queryClient = useQueryClient();
	return useQuery(["sessionsummaries"], async () => {
		return apiPrivate.get("/sessionsummaries");
	});
};
export const useGetSessionDetailsbySessionid = (sessionid) => {
	const apiPrivate = useApiCreds();
	const queryClient = useQueryClient();
	return useQuery(["sessionsummaries"], async () => {
		return apiPrivate.get(`/sessionsummaries/${sessionid}`);
	});
};
