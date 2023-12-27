import dynamic from "next/dynamic";
import React from "react";
const BattleroomPage = dynamic(
  () => import("@old_pages/pppoints/BattleroomPage"),
  { ssr: false }
);
const PointsBattleRoomPage = () => {
  return <BattleroomPage />;
};

export default PointsBattleRoomPage;
