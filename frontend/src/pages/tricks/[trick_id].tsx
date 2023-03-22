import { trpc } from "@utils/trpc";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

const TricksPage = () => {
  const router = useRouter();
  const { trick_id } = router.query;
  const { data: trickInfo, isSuccess } = trpc.trick.findById.useQuery({
    trick_id: trick_id as string,
  });
  const { data: combos } = trpc.trick.findCombosWithTrick.useQuery({
    trick_id: trick_id as string,
  });
  if (!isSuccess) return <div>Loading..</div>;
  return (
    <div
      className={`backrop-blur-xl no-scrollbar flex h-[100vh] w-full flex-col place-items-center gap-2 overflow-hidden overflow-y-scroll bg-zinc-900 bg-opacity-70 p-4 font-inter text-zinc-300`}
    >
      <div className="flex place-items-center gap-2">
        <h1 className="text-bold text-2xl ">{trickInfo.name}</h1>
        <p>{trickInfo.pointValue}</p>
      </div>
      <p>{trickInfo.trickType}</p>
      <p
        className={
          "outlineButton flex w-full border-[1px] border-zinc-300 p-1 text-xs"
        }
      >
        {trickInfo.base.name}
      </p>
      <div className="flex w-full gap-2">
        <p
          className={
            "outlineButton flex w-full border-[1px] border-sky-300 p-1 text-xs"
          }
        >
          {trickInfo.takeoffStance}
        </p>
        <p
          className={
            "outlineButton flex w-full border-[1px] border-teal-300 p-1 text-xs"
          }
        >
          {trickInfo.landingStance}
        </p>
      </div>
      {trickInfo?.variations?.map((v) => (
        <div
          key={`${v.variation.name} + ${Math.random()}`}
          className="outlineButton flex h-fit w-full justify-between gap-2 border-[1px] border-indigo-400 p-1 text-xs"
        >
          <div>{v.variation.name}</div>
          <div>{v.variation.pointValue}</div>
        </div>
      ))}
      <CombosWithTrickDisplay combos={combos} trick={trickInfo.name} />
    </div>
  );
};

export default TricksPage;

const CombosWithTrickDisplay = ({ combos, trick }) => {
  const [seeExample, setSeeExample] = useState();
  return (
    <div className="flex w-full flex-col gap-2 p-2">
      <h1>Combos containing {trick}</h1>
      {combos.map((combo) => (
        <div key={combo.combo_id}>
          <div className="flex gap-2 overflow-hidden overflow-x-scroll rounded-md bg-zinc-800 p-2 text-xs">
            {/* <p>{combo.Clips.length > 0 && combo.Clips.length} </p> */}
            {combo.comboArray.map((trick, i) => (
              <p className={"flex  whitespace-nowrap"}>
                <span>{trick.name}</span>
                <span>{i !== combo.comboArray.length - 1 && ">"}</span>
              </p>
            ))}
          </div>
          <div className={"text-xs"}>
            {combo.Clips.map((clip, i) => (
              <div>
                <ExampleClipDisplay
                  clip={clip}
                  i={i}
                  setSeeExample={setSeeExample}
                  seeExample={seeExample}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const ExampleClipDisplay = ({ clip, i, seeExample, setSeeExample }) => {
  const vidRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const handleClick = (id) => {
    setSeeExample(id);
    setIsPlaying(true);
    vidRef?.current?.seekTo(clip.clipStart);
    console.log(vidRef.current);
  };

  return (
    <>
      {seeExample === clip.id && (
        <div>
          <div className="p-2">
            <div className="flex aspect-video w-full overflow-clip rounded-md">
              <ReactPlayer
                ref={vidRef}
                config={{ facebook: { appId: "508164441188790" } }}
                id={"video"}
                controls={true}
                muted
                playing={isPlaying}
                width={"100%"}
                height={"100%"}
                loop
                onReady={() => vidRef?.current?.seekTo(clip.clipStart)}
                onProgress={({ playedSeconds }) => {
                  if (playedSeconds >= clip.clipEnd) {
                    vidRef?.current?.seekTo(clip.clipStart);
                  }
                }}
                playsInline
                url={clip.summary.SessionSources[0].vidsrc}
              />
            </div>
          </div>
        </div>
      )}
      <button
        type={"button"}
        className={"rounded-md bg-zinc-700 px-2"}
        onClick={() => handleClick(clip.id)}
      >{`Clip ${i + 1}`}</button>
    </>
  );
};
