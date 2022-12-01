import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useApiCreds from "../hooks/useApiCreds";
import { useUserStore } from "../store/userStore";
import { UserInfo } from "@store/userStore";
interface BattleRoomSession {
  hostID?: UserInfo;
  team1?: any[];
  team2?: any[];
  judges?: any[];
  sessionid?: any;
  duration?: number;
}
const useBattleRoomSetup = () => {
  const apiPrivate = useApiCreds();
  const queryClient = useQueryClient();
  return useMutation(
    ["makeBattleRoom"],
    async (data: BattleRoomSession) => {
      return apiPrivate.post("/battlerooms", { data });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["BattleRooms"]);
        console.log("succeeded saving BattleRoom setup");
      },
    }
  );
};

export const useBattleRoomClose = (sessionid: string) => {
  const apiPrivate = useApiCreds();
  const queryClient = useQueryClient();
  return useMutation(
    ["closeBattleRoom"],
    async () => {
      return apiPrivate.put(`/battlerooms/${sessionid}`, {});
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["BattleRooms"]);
        console.log("closeBattleRoom");
      },
    }
  );
};
interface RoomStats {
  team1Score?: number;
  team2Score?: number;
  team1AudienceScore?: number;
  team2AudienceScore?: number;
  winner?: any;
  audienceWinner?: any;
}
export const useBattleRoomUpdate = (sessionid: string) => {
  const apiPrivate = useApiCreds();
  const queryClient = useQueryClient();
  return useMutation(
    ["updateBattleRoom"],
    async (data: RoomStats) => {
      return apiPrivate.post(`/battlerooms/${sessionid}`, { data });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["BattleRooms"]);
        console.log("updateBattleRoomStats");
      },
    }
  );
};
interface RoomScore {
  judge?: any;
  team: string;
  score: number;
  user?: any;
}
export const useBattleRoomUpdateScore = (sessionid: string) => {
  const apiPrivate = useApiCreds();
  const queryClient = useQueryClient();
  return useMutation(
    ["updateBattleRoomScore"],
    async (data: RoomScore) => {
      return apiPrivate.post(`/battlerooms/${sessionid}/score`, { data });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["BattleRooms"]);
        console.log("updateBattleRoomStats");
      },
    }
  );
};
export const useGetBattleRooms = () => {
  const apiPrivate = useApiCreds();
  return useQuery(["BattleRooms"], async () => {
    const { data } = await apiPrivate.get("/battlerooms", {
      withCredentials: true,
    });
    return data;
  });
};
export const useGetBattleRoombySessionid = (sessionid) => {
  const apiPrivate = useApiCreds();
  return useQuery(["BattleRoom", sessionid], async () => {
    const { data } = await apiPrivate.get(`/battlerooms/${sessionid}`, {
      withCredentials: true,
    });
    return data;
  });
};

export default useBattleRoomSetup;
