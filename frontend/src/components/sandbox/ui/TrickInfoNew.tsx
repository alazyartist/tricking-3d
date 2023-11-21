import { useStore } from "@store/store";
import { trpc } from "@utils/trpc";
import React from "react";

const TrickInfoNew = () => {
  const currentAnim = useStore((s) => s.currentAnim);
  const { data: trickInfo } = trpc.animations.findInfoByAnimation.useQuery({
    animation: currentAnim,
  });
  return (
    <div>
      <div className="text-zinc-100">{currentAnim}</div>
      {trickInfo && (
        <div className="text-zinc-100">
          {trickInfo.map((info) => {
            return <div>{info.name}</div>;
          })}
        </div>
      )}
    </div>
  );
};

export default TrickInfoNew;
