import React, { useState } from "react";
import BattleroomSetup from "./BattleroomSetup";

const HostBattleroom = ({ ably }) => {
  const [setupVisible, setSetupVisible] = useState(false);
  return setupVisible ? (
    <div className=" absolute top-[5vh] left-[10vw] z-[1005] flex h-[80vh] w-[80vw] flex-col place-items-center rounded-md bg-zinc-800">
      <BattleroomSetup ably={ably} setSetupVisible={setSetupVisible} />
    </div>
  ) : (
    <div
      className=" mt-1 rounded-md bg-emerald-800 p-1 px-2"
      onClick={() => setSetupVisible(true)}
    >
      HostSession
    </div>
  );
};

export default HostBattleroom;
