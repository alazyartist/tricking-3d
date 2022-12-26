import React, { useEffect } from "react";
import Link from "next/link";
import useAblyStore from "../../hooks/useAblyStore";
import { useUserStore } from "../../store/userStore";
import ClosedBattlerooms from "./components/ClosedBattlerooms";
import HostBattleroom from "./components/HostBattleroom";
import LiveBattlerooms from "./components/LiveBattlerooms";
const ably = useAblyStore.getState().ably;
const PointsPage = () => {
  const userInfo = useUserStore((s) => s.userInfo);
  return (
    <div className="fixed top-0 left-0 flex h-screen w-screen flex-col place-items-center p-2 pt-14 text-zinc-300">
      <div className=" font-titan text-3xl font-black ">BattleRooms++</div>
      <div className="neumorphicIn w-[70vw] rounded-xl p-4  font-bold text-zinc-300">
        <LiveBattlerooms ably={ably} />
      </div>
      <div className="flex gap-5">
        {userInfo.uuid ? (
          <HostBattleroom ably={ably} />
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
      <div className="neumorphicIn w-[70vw] rounded-xl p-4  font-bold text-zinc-300">
        <ClosedBattlerooms />
      </div>
    </div>
  );
};

export default PointsPage;
