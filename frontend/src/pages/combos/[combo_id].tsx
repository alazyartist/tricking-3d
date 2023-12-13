import AnimatedSearch from "@old_pages/home/components/AnimatedSearch";
import { combos } from "@prisma/client";
import { trpc } from "@utils/trpc";
import { useRouter } from "next/router";
import { ExampleClipDisplay } from "pages/tricks/[trick_id]";
import React, { useEffect, useState } from "react";
import { IoIosWalk } from "react-icons/io";

const ComboPage = () => {
  const router = useRouter();
  const { combo_id } = router.query;
  const { data: comboInfo, isSuccess } = trpc.combos.findById.useQuery({
    combo_id: combo_id as string,
  });
  const [seeExample, setSeeExample] = useState("");
  if (!isSuccess) return <div>Loading..</div>;
  //@ts-ignore
  const comboArray = comboInfo.comboArray as combos[];
  return (
    <div
      className={`backrop-blur-xl no-scrollbar no-scrollbar flex h-[100vh] w-full flex-col place-items-center gap-2 overflow-hidden overflow-y-scroll bg-zinc-900 bg-opacity-70 p-4 font-inter text-zinc-300`}
    >
      <div className="absolute left-4 top-4">
        <AnimatedSearch />
      </div>
      <div className="flex place-items-center gap-2 pt-14">
        <h1 className="text-bold flex w-full flex-wrap text-2xl">
          {Array.isArray(comboArray) &&
            comboArray?.map((c: combos, i) => (
              <span className={"whitespace-nowrap"}>
                {c.name}
                {i + 1 !== comboArray?.length ? ">" : ""}
              </span>
            ))}
        </h1>
        <p>{comboInfo.pointValue}</p>
      </div>
      <p>{comboInfo.type}</p>
      <p>{comboInfo.shorthand}</p>
      {comboInfo.Clips?.length > 0 ? (
        <ComboDetails
          tricks={comboInfo.comboArray}
          chainMap={comboInfo.Clips?.[0].chainMap}
          varietyMap={comboInfo.Clips?.[0].varietyMap}
        />
      ) : (
        <ComboDetails
          tricks={comboInfo.comboArray}
          chainMap={[]}
          varietyMap={[]}
        />
      )}
      <div id={"video-portal"} />
      <div>{comboInfo.Clips.length > 0 ? "Clips" : "No Clips Yet"}</div>
      {comboInfo.Clips.map((clip, i) => (
        <div key={clip.id}>
          <ExampleClipDisplay
            clip={clip}
            i={i}
            seeExample={seeExample}
            setSeeExample={setSeeExample}
          />
        </div>
      ))}
    </div>
  );
};

export default ComboPage;

const ComboDetails = ({ tricks, chainMap, varietyMap }) => {
  return (
    <div
      className={
        "no-scrollbar flex h-fit w-full gap-1 overflow-x-scroll p-2 text-sm"
      }
    >
      {tricks &&
        tricks.map((tr, i) => {
          let bonusTotal = (
            parseFloat(
              chainMap?.map((cm) => (cm[0] === i ? cm[1] : "0"))[0] || 0
            ) +
            tr.pointValue +
            parseFloat(
              varietyMap?.map((vm) => (vm[0] === i ? vm[2] : "0"))[0] || 0
            )
          ).toFixed(2);
          return (
            <div
              className={`relative flex h-full flex-col place-items-center justify-between gap-1 whitespace-nowrap rounded-md bg-opacity-20 p-1 ${
                tr.type === "Transition" ? "bg-zinc-600" : "bg-zinc-300"
              }`}
            >
              <div className={"flex h-full flex-col gap-1 "} key={`${tr.name}`}>
                <div className="text-center font-medium">{tr.name}</div>
                {tr.type === "Transition" && (
                  <>
                    <div
                      className={
                        "outlineButton flex justify-between gap-2 border-[1px] border-zinc-300 p-1 text-xs"
                      }
                    >
                      <div>{tr.name}</div>
                      <div>{tr.pointValue}</div>
                    </div>
                  </>
                )}
                {tr.type === "Trick" && (
                  <>
                    <div
                      className={
                        "outlineButton flex justify-between gap-2 border-[1px] border-zinc-300 p-1 text-xs"
                      }
                    >
                      <div>{tr.base_id}</div>
                      <div>{tr?.base?.pointValue}</div>
                    </div>
                    {tr?.variations?.map((v) => (
                      <div
                        key={`${v.variation.name} + ${Math.random()}`}
                        className="outlineButton flex h-fit w-full justify-between gap-2 border-[1px] border-indigo-400 p-1 text-xs"
                      >
                        <div>{v.variation.name}</div>
                        <div>{v.variation.pointValue}</div>
                      </div>
                    ))}
                    <div
                      className={
                        "outlineButton flex justify-between gap-2 border-[1px] border-teal-300 p-1 text-xs"
                      }
                    >
                      <div>{tr.landingStance}</div>
                    </div>
                  </>
                )}
              </div>
              <div className="flex flex-col">
                <div className="flex place-content-center place-items-center gap-2">
                  <div>{tr.pointValue}</div>
                  {tr.defaultAnimation && (
                    <IoIosWalk className="text-emerald-500" />
                  )}
                </div>
                <div>
                  {chainMap &&
                    chainMap?.map((cm) =>
                      cm[0] - 2 === i ? (
                        <>
                          <div
                            className={`absolute bottom-[10px] left-[90%] z-[-1] h-4 w-[110px] rounded-md bg-zinc-300 bg-opacity-20`}
                          />
                        </>
                      ) : null
                    )}
                </div>
                <div>
                  {chainMap &&
                    chainMap?.map((cm) =>
                      cm[0] === i ? (
                        <div className="flex gap-1">
                          <div className={"text-[10px]"}>
                            {cm[2].toFixed(2)}cx
                          </div>
                          <div>{cm[1].toFixed(2)}</div>
                        </div>
                      ) : null
                    )}
                </div>
                <div>
                  {varietyMap &&
                    varietyMap?.map((vm) =>
                      vm[0] === i ? (
                        <div className="flex gap-1">
                          <div className={"text-[10px]"}>
                            {vm[1].toFixed(2)}vx
                          </div>
                          <div>{vm[2].toFixed(2)}</div>
                        </div>
                      ) : null
                    )}
                </div>
                <div>{bonusTotal}</div>
                <div className="text-[8px]">{tr.type}</div>
              </div>
            </div>
          );
        })}
    </div>
  );
};
//  <div className="flex w-full gap-2">
//         <p
//           className={
//             "outlineButton flex w-full border-[1px] border-sky-300 p-1 text-xs"
//           }
//         >
//           {comboInfo.takeoffStance}
//         </p>
//         <p
//           className={
//             "outlineButton flex w-full border-[1px] border-teal-300 p-1 text-xs"
//           }
//         >
//           {comboInfo.landingStance}
//         </p>
//       </div>
//       {comboInfo?.variations?.map((v) => (
//         <div
//           key={`${v.variation.name} + ${Math.random()}`}
//           className="outlineButton flex h-fit w-full justify-between gap-2 border-[1px] border-indigo-400 p-1 text-xs"
//         >
//           <div>{v.variation.name}</div>
//           <div>{v.variation.pointValue}</div>
//         </div>
//       ))}
