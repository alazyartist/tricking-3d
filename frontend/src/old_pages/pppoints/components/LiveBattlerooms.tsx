import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useGetBattleRooms } from "../../../api/useBattleRoom";
import { useUserStore } from "../../../store/userStore";
import { FaGavel } from "react-icons/fa";
import { trpc } from "@utils/trpc";
const LiveBattlerooms = ({ ably }) => {
  const liveSessionsChannel = ably?.channels.get("[?rewind=10m]LiveSessions");
  const userUUID = useUserStore((s) => s.userInfo.uuid);

  const [liveSessionsFeed, updateLiveSessionsFeed] = useState([]);
  // const { data: battleRooms } = useGetBattleRooms();
  const { data: battleRooms } = trpc.battleroom.getRooms.useQuery();
  useEffect(() => {
    console.log(battleRooms);
  }, [battleRooms]);
  // useEffect(() => {
  // 	const subscribe = async () => {
  // 		await liveSessionsChannel.subscribe("newSession", (m) => {
  // 			console.log(m, liveSessionsFeed);
  // 			const newMessages = liveSessionsFeed.slice(-4);
  // 			newMessages.push(m.data);
  // 			updateLiveSessionsFeed(newMessages);
  // 		});
  // 	};
  // 	subscribe();

  // 	return () => liveSessionsChannel.unsubscribe();
  // });

  //Connect to liveSessions channel
  return (
    <div>
      <div>Live BattleRooms</div>
      <div className="flex max-h-[50vh] flex-col gap-2 overflow-y-auto rounded-md font-normal text-zinc-300">
        {liveSessionsFeed?.length < 1 &&
          (battleRooms?.length < 1 ||
            battleRooms?.every((r) => r.isOpen === false)) &&
          "No Sessions Available"}
        {battleRooms?.map((room) => {
          if (room.isOpen) {
            return (
              <Link
                className="flex w-full place-items-center justify-around gap-2 rounded-md bg-zinc-900 p-2"
                href={`pppoints/${room.battleroomid}`}
              >
                <span>
                  {Array.isArray(room?.team1) &&
                    room?.team1?.map(
                      (user: { username: string; uuid: string }, index) => (
                        <span key={user.uuid}>
                          {user.username}{" "}
                          {Array.isArray(room?.team1) &&
                            room?.team1.length > 1 &&
                            room?.team1.length - 1 !== index &&
                            "&"}{" "}
                        </span>
                      )
                    )}
                  <span className="text-xs text-zinc-400">vs</span>
                  {Array.isArray(room?.team2) &&
                    room?.team2?.map(
                      (user: { username: string; uuid: string }, index) => (
                        <span>
                          {user.username}
                          {Array.isArray(room?.team2) &&
                            room?.team2.length > 1 &&
                            room?.team2.length - 1 !== index &&
                            "&"}{" "}
                        </span>
                      )
                    )}
                </span>
                <span>
                  {Array.isArray(room?.judges) &&
                    room.judges.some(
                      (j: { uuid: string }) => j.uuid === userUUID
                    ) && <FaGavel className="text-emerald-500" />}
                </span>
              </Link>
            );
          }
        })}
        {/* {liveSessionsFeed?.map((m) => (
					<Link href={`${m.sessionID}`}>
						{m?.team1?.map((user) => (
							<span key={user.uuid}>
								{user.username} {m?.team1.length > 1 && "&"}{" "}
							</span>
						))}{" "}
						VERSUS{" "}
						{m?.team2?.map((user) => (
							<span>
								{user.username}
								{m?.team2.length > 1 && "&"}{" "}
							</span>
						))}
					</Link>
				))} */}
      </div>
    </div>
  );
};

export default LiveBattlerooms;
