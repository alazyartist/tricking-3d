import UserProfilePicById from "@components/info/UserProfilePicById";
import AnimatedSearch from "@old_pages/home/components/AnimatedSearch";
import { trpc } from "@utils/trpc";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
      <div className="absolute left-4 top-4">
        <AnimatedSearch />
      </div>
      <div className="minimalistScroll mt-14 h-[80vh] w-full overflow-y-scroll rounded-md bg-zinc-900  bg-opacity-70 p-2">
        <TrickInfoGrid trickInfo={trickInfo} />
        <div className="sticky top-2" id={"video-portal"} />
        <CombosWithTrickDisplay combos={combos} trick={trickInfo.name} />
      </div>
    </div>
  );
};

export default TricksPage;
export const TrickInfoGrid = ({ trickInfo }) => {
  return (
    <div className="relative flex w-full flex-col place-content-center place-items-center gap-2 md:left-[25vw] md:max-w-[50vw]">
      <div className="flex place-items-center gap-2 ">
        <div>
          <h1 className="text-2xl font-bold ">{trickInfo.displayName}</h1>
          <h1 className="text-normal text-center text-xs text-zinc-400 ">
            {trickInfo.name}
          </h1>
        </div>
        <p>{trickInfo.pointValue}</p>
      </div>
      <p>{trickInfo.trickType}</p>
      <p
        className={
          "outlineButton flex w-full border-[1px] border-zinc-300 p-1 text-xs"
        }
      >
        {trickInfo.base?.name}
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
          key={`${v.variation?.name} + ${Math.random()}`}
          className="outlineButton flex h-fit w-full justify-between gap-2 border-[1px] border-indigo-400 p-1 text-xs"
        >
          <div>{v.variation?.name}</div>
          <div>{v.variation?.pointValue}</div>
        </div>
      ))}
    </div>
  );
};

const CombosWithTrickDisplay = ({ combos, trick }) => {
  const [seeExample, setSeeExample] = useState();
  return (
    <div className="minimalistScroll flex h-full w-full flex-col place-content-start gap-2 p-2 pt-0">
      <h1 className=" bg-zinc-900 p-2 text-xl">Combos containing {trick}</h1>
      {combos.map((combo) => (
        <div key={combo.combo_id}>
          <div className="no-scrollbar flex justify-between overflow-hidden overflow-x-scroll rounded-md bg-zinc-800 p-2 text-xs">
            <div className="no-scrollbar flex gap-1 overflow-hidden overflow-x-scroll text-xs">
              {combo.comboArray.map((trick, i) => (
                <div
                  key={`${trick.name} ${i}`}
                  className={"flex place-items-center gap-1 whitespace-nowrap"}
                >
                  <p
                    className={`${
                      trick.type === "Transition" ? "text-[10px]" : ""
                    }`}
                  >
                    {trick.name}
                  </p>
                  <p>{i !== combo.comboArray.length - 1 && ">"}</p>
                </div>
              ))}
            </div>
            <Link href={`/combos/${combo.combo_id}`}>
              <p className="text-xs">...</p>
            </Link>
          </div>
          <div className={"flex gap-2 pt-2 text-xs"}>
            {combo.Clips.map((clip, i) => (
              <div key={`${clip.id} ${i}`}>
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
      <div className="w-full">no more...</div>
      <div className="w-full p-10" />
    </div>
  );
};

export const ExampleClipDisplay = ({ clip, i, seeExample, setSeeExample }) => {
  const vidRef = useRef<ReactPlayer>();
  const [isPlaying, setIsPlaying] = useState(false);
  const handleClick = (id) => {
    setSeeExample(id);
    setIsPlaying(true);
    if (vidRef.current) {
      vidRef?.current?.seekTo(clip.clipStart);
    }
  };
  const { data: user_image } = trpc.userDB.findUserImageById.useQuery({
    uuid: clip.summary.user_id,
  });

  return (
    <>
      {seeExample === clip.id && (
        <div>
          {createPortal(
            <div className="no-scrollbar flex aspect-video w-full overflow-clip rounded-md">
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
                onReady={() =>
                  vidRef?.current && vidRef?.current?.seekTo(clip.clipStart)
                }
                onProgress={({ playedSeconds }) => {
                  if (playedSeconds >= clip.clipEnd && vidRef?.current) {
                    vidRef?.current?.seekTo(clip.clipStart);
                  }
                }}
                playsInline
                url={clip.summary.SessionSources[0].vidsrc}
              />
            </div>,
            document.getElementById("video-portal")
          )}
        </div>
      )}
      <button
        type={"button"}
        className={"flex justify-between gap-2 rounded-md bg-zinc-700 p-2"}
        onClick={() => handleClick(clip.id)}
      >
        <img
          src={user_image}
          className={"h-6 w-6 place-self-start rounded-full"}
        />
        <p>{`Clip ${i + 1}`}</p>
      </button>
    </>
  );
};
