import { trpc } from "@utils/trpc";
import React, { useState } from "react";
import { FaCheck, FaCircle } from "react-icons/fa";
import DataListCommandBar from "../DataListCommandBar";
import MakeNewTrickModal from "./sessionreview/MakeNewTrickModal";
import { useSessionSummariesStore } from "./sessionreview/SessionSummaryStore";
import * as d3 from "d3";
import { combos, tricks } from "@prisma/client";
const DataList = () => {
  const { data: tricks } = trpc.trick.findAllwithComboClips.useQuery();
  const { data: combos } = trpc.combos.getAll.useQuery();
  // const { data: trickPoints, refetch } = useGetTrickPoints();
  let trickMakerOpen = useSessionSummariesStore((s) => s.trickMakerOpen);
  const [animPopup, toggleAnimPopup] = useState(false);
  const [currentTrick, setCurrentTrick] = useState<combos | tricks>(null!);
  const { data: animations } = trpc.animations.findAll.useQuery();
  const handleAnimPopup = (chosen: tricks | combos) => {
    toggleAnimPopup((p) => !p);
    setCurrentTrick(chosen);
  };

  if (!combos) return <div>Getting Combos</div>;
  if (!tricks) return <div>Getting Tricks</div>;
  return (
    <div className="no-scrollbar flex max-h-[70vh] w-full flex-col place-items-center gap-2 overflow-y-scroll rounded-xl pb-14">
      <h1
        // onClick={() => refetch()}
        className="sticky top-0 h-full w-full bg-zinc-800 p-2 text-center text-xl font-bold"
      >
        TRICKS
      </h1>
      <div className="w-[90vw] text-sm">
        {tricks
          //@ts-ignore
          ?.sort((a, b) => {
            if ((a.type as string) < (b.type as string)) return 1;
            if ((a.type as string) > (b.type as string)) return -1;
            if ((a.base_id as string) > (b.base_id as string)) return 1;
            if ((a.base_id as string) < (b.base_id as string)) return -1;
            if ((a.pointValue as number) > (b.pointValue as number)) return 1;
            if ((b.pointValue as number) < (a.pointValue as number)) return -1;

            return a.name?.localeCompare(b.name as string, undefined, {
              numeric: true,
              sensitivity: "base",
            });
          })
          ?.map((trick) => (
            <DLTrickDisplay
              key={trick.trick_id + trick.type}
              handleAnimPopup={handleAnimPopup}
              trick={trick}
            />
          ))}
      </div>
      <h1 className="sticky top-0 h-full w-full bg-zinc-800 p-2 text-center text-xl font-bold">
        Combos
      </h1>
      <div>
        {combos
          ?.sort((a, b) => {
            if ((a.pointValue as number) > (b.pointValue as number)) return 1;
            if ((a.pointValue as number) < (b.pointValue as number)) return -1;
            return 0;
          })
          ?.map((combo) => (
            <div
              key={Math.random()}
              className="grid w-[90vw] grid-cols-6 place-content-center place-items-center justify-between p-2 text-sm odd:bg-zinc-700 odd:bg-opacity-70 even:bg-zinc-900 even:bg-opacity-70"
            >
              <div className=" col-span-3 max-w-[120px] place-self-start overflow-hidden whitespace-pre-wrap md:max-w-[400px]">
                {combo?.name}
              </div>
              <div className="text-center">{combo?.pointValue}</div>
              <div className="flex place-content-end place-items-center gap-2">
                DA
                {combo?.defaultAnimation ? (
                  <div className="text-emerald-500">
                    <FaCheck />
                  </div>
                ) : (
                  <div
                    className="text-red-700"
                    onClick={() => handleAnimPopup(combo)}
                  >
                    <FaCircle />
                  </div>
                )}
              </div>
              <p
                style={{
                  color: d3.interpolateRdYlGn(combo?.Clips?.length / 10),
                }}
              >
                {combo?.Clips?.length}
              </p>
              {/* <div className='flex place-content-end place-items-center gap-2'>
							CA
							{combo?.comboArray ? (
								<FaCheck className='text-emerald-500' />
							) : (
								<FaCircle className='text-red-700' />
							)}
						</div> */}
            </div>
          ))}
      </div>
      {animPopup && (
        <AnimPopup
          toggle={toggleAnimPopup}
          currentTrick={currentTrick}
          animations={animations}
        />
      )}
      <DataListCommandBar />
      {trickMakerOpen ? <MakeNewTrickModal /> : null}
    </div>
  );
};

export default DataList;

const AnimPopup = ({ toggle, animations, currentTrick }) => {
  const { mutate: setAnim } = trpc.trick.setDefaultAnimation.useMutation();
  const handleSetAnim = (anim) => {
    setAnim({
      trick_id: currentTrick.trick_id,
      animation_id: anim.animation_id,
    });
    toggle(false);
  };
  return (
    <div className="absolute left-[5vw] top-10 z-[110] h-[80vh] w-[90vw] space-y-2 overflow-y-scroll bg-zinc-800 p-2 text-zinc-300">
      <div
        className="sticky top-0 z-[2] bg-zinc-800 font-black text-red-500 "
        onClick={() => toggle(false)}
      >
        x
      </div>
      <h1 className={"sticky top-2 bg-zinc-800 p-2 text-2xl text-emerald-200"}>
        {currentTrick.name}
      </h1>
      <div className={"h-full space-y-2 "}>
        {animations &&
          animations
            .sort((a, b) => {
              return a.animationName > b.animationName ? 1 : -1;
            })
            .map((a) => (
              <div
                onClick={() => handleSetAnim(a)}
                className={"rounded-md bg-zinc-900 p-1"}
              >
                {a.animationName}
              </div>
            ))}
      </div>
    </div>
  );
};

const DLTrickDisplay = ({ trick, handleAnimPopup }) => {
  let numOfClips = trick.combos
    .map((combo) => combo.Clips.length)
    .reduce((sum, b) => sum + b, 0);

  //   (sum, b) => sum + b.reduce((sum2, b2) => sum2 + b2.Clips.length, 0),
  //   0
  // );

  return (
    <div
      key={Math.random()}
      className=" grid  w-full grid-cols-7 place-items-center justify-between p-2 odd:bg-zinc-700 odd:bg-opacity-70 even:bg-zinc-900 even:bg-opacity-70"
    >
      <div className="col-span-3 max-w-[1/3] place-self-start">
        <div>
          <p>{trick?.displayName}</p>
          <p className="text-xs text-zinc-500">{trick?.name}</p>
        </div>
      </div>
      <div className="col-span-1 flex place-items-center text-xs text-zinc-500">
        {trick?.trickType}
      </div>
      <div className="col-span-1">
        {trick.pointValue}
        {/* {trickPoints?.map((tp) => {
          return tp?.name === trick?.name && tp?.Total?.toFixed(2);
        })}
        {trick.type === "Stance" && trick.pointValue?.toFixed(2)}
        {trick.type === "Transition" && trick.pointValue?.toFixed(2)} */}
      </div>
      <div className="col-span-1 flex place-content-end place-items-center gap-2">
        DA
        {trick?.defaultAnimation ? (
          <FaCheck color="rgb(16 185 129)" />
        ) : (
          <span onClick={() => handleAnimPopup(trick)}>
            <FaCircle color="rgb(185 28 28)" />
          </span>
        )}
      </div>
      <p style={{ color: d3.interpolateRdYlGn(numOfClips / 10) }}>
        {numOfClips}
      </p>
    </div>
  );
};
