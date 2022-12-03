import dynamic from "next/dynamic";
import React from "react";
const BattleRoomStats = dynamic(
  () => import("@old_pages/pppoints/components/BattleroomStats"),
  { ssr: false }
);
const BattleRoomStatsPage = () => {
  return <BattleRoomStats />;
};
export default BattleRoomStatsPage;
