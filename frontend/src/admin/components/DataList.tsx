import { trpc } from "@utils/trpc";
import React, { useState } from "react";
import { FaCheck, FaCircle } from "react-icons/fa";
import useGetCombos from "../../api/useGetCombos";
import useGetTricks, { useGetTrickPoints } from "../../api/useGetTricks";
import DataListCommandBar from "../DataListCommandBar";
import MakeNewTrickModal from "./sessionreview/MakeNewTrickModal";
import { useSessionSummariesStore } from "./sessionreview/SessionSummaryStore";
import * as d3 from "d3";
import { combos, tricks } from "@prisma/client";
const DataList = () => {
  // const { data: tricks } = useGetTricks();
  // const { data: combos } = useGetCombos();
  const { data: tricks } = trpc.trick.findAllwithComboClips.useQuery();
  const { data: combos } = trpc.combos.getAll.useQuery();
  // const { data: trickPoints, refetch } = useGetTrickPoints();
  let trickMakerOpen = useSessionSummariesStore((s) => s.trickMakerOpen);
  const [animPopup, toggleAnimPopup] = useState(false);
  const [currentTrick, setCurrentTrick] = useState(null);
  const { data: animations } = trpc.animations.findAll.useQuery();
  console.log(animations);
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
        TRICKS, STANCES, &#38; TRANSITIONS
      </h1>
      <div className="w-[90vw] text-sm">
        {tricks
          ?.sort((a, b) => {
            if (a.type < b.type) return 1;
            if (a.type > b.type) return -1;
            if (a.base_id > b.base_id) return 1;
            if (a.base_id < b.base_id) return -1;
            if (a.pointValue > b.pointValue) return 1;
            if (b.pointValue < a.pointValue) return -1;

            return a.name?.localeCompare(b.name, undefined, {
              numeric: true,
              sensitivity: "base",
            });
          })
          ?.map((trick) => (
            <DLTrickDisplay handleAnimPopup={handleAnimPopup} trick={trick} />
          ))}
      </div>
      <h1 className="sticky top-0 h-full w-full bg-zinc-800 p-2 text-center text-xl font-bold">
        Combos
      </h1>
      <div>
        {combos
          ?.sort((a, b) => {
            if (a.pointValue > b.pointValue) return 1;
            if (a.pointValue < b.pointValue) return -1;
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
                  <FaCheck className="text-emerald-500" />
                ) : (
                  <FaCircle
                    onClick={() => handleAnimPopup(combo)}
                    className="text-red-700"
                  />
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
  return (
    <div className="absolute top-10 left-10 z-[110] h-[80vh] w-[80vw] overflow-y-scroll bg-zinc-800 p-2 text-zinc-300">
      <div
        className="sticky top-0 z-[2] bg-zinc-800 font-black text-red-500 "
        onClick={() => toggle(false)}
      >
        x
      </div>
      <h1 className={"sticky top-2 bg-zinc-800 p-2 text-2xl text-emerald-200"}>
        {currentTrick.name}
      </h1>
      <div className={"h-full "}>
        {animations &&
          animations
            .sort((a, b) => {
              return a.animationName > b.animationName ? 1 : -1;
            })
            .map((a) => <div>{a.animationName}</div>)}
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
      onClick={() => console.log(trick)}
      className=" grid  w-full grid-cols-7 place-items-center justify-between p-2 odd:bg-zinc-700 odd:bg-opacity-70 even:bg-zinc-900 even:bg-opacity-70"
    >
      <div className="col-span-3 max-w-[1/3] place-self-start">
        {trick?.name}
      </div>
      <div className="col-span-1 flex place-items-center text-sm">
        {trick?.type?.slice(0, 6)}
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
          <FaCheck className="text-emerald-500" />
        ) : (
          <FaCircle
            onClick={() => handleAnimPopup(trick)}
            className="text-red-700"
          />
        )}
      </div>
      <p style={{ color: d3.interpolateRdYlGn(numOfClips / 10) }}>
        {numOfClips}
      </p>
    </div>
  );
};
