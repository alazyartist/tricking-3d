import { transitions } from "@prisma/client";
import { useStore } from "@store/store";
import { trpc } from "@utils/trpc";
import { TrickInfoGrid } from "pages/tricks/[trick_id]";
import React from "react";

const TrickInfoNew = () => {
  const currentAnim = useStore((s) => s.currentAnim);
  const { data: trickInfo } = trpc.animations.findInfoByAnimation.useQuery({
    animation: currentAnim,
  });
  console.log(trickInfo);
  return (
    <div className="h-[80vw] w-full overflow-y-scroll">
      <div className="text-zinc-100">{currentAnim}</div>
      {trickInfo && (
        <div className="flex flex-col gap-2 text-zinc-100">
          {trickInfo.map((info) => {
            return (
              <div key={info.name}>
                {info.type === "Trick" && <TrickInfoGrid trickInfo={info} />}
                {info.type === "Transition" && (
                  <TransitionInfoGrid transitionInfo={info as transitions} />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TrickInfoNew;

const TransitionInfoGrid = ({
  transitionInfo,
}: {
  transitionInfo: transitions;
}) => {
  return (
    <div className="mt-14 flex w-full flex-col place-items-center gap-2 md:max-w-[800px]">
      <div className="flex place-items-center gap-2 ">
        <h1 className="text-bold text-2xl ">{transitionInfo.name}</h1>
        <p>{transitionInfo.pointValue}</p>
      </div>
      <p>{transitionInfo.type}</p>
      <p
        className={
          "outlineButton flex w-full border-[1px] border-zinc-300 p-1 text-xs"
        }
      >
        {transitionInfo.transitionType}
      </p>
      <div className="flex w-full gap-2">
        <p
          className={
            "outlineButton flex w-full border-[1px] border-sky-300 p-1 text-xs"
          }
        >
          {transitionInfo.fromLeg}
        </p>
        <p
          className={
            "outlineButton flex w-full border-[1px] border-teal-300 p-1 text-xs"
          }
        >
          {transitionInfo.toLeg}
        </p>
      </div>
      <div className="outlineButton flex h-fit w-full justify-between gap-2 border-[1px] border-indigo-400 p-1 text-xs">
        <div>{transitionInfo.landingStyle}</div>
        <div>{transitionInfo.takeoffStyle}</div>
      </div>
    </div>
  );
};
