import { SignedIn } from "@clerk/nextjs";
import UserProfilePicById from "@components/info/UserProfilePicById";
import BiCube from "@data/icons/BiCube";
import useClickOutside from "@hooks/useClickOutside";
import useScreenOrientation from "@hooks/UseScreenOrientaion";
import AnimatedSearch from "@old_pages/home/components/AnimatedSearch";
import { useUserStore } from "@store/userStore";
import { trpc } from "@utils/trpc";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import ReactPlayer from "react-player";

const TricksPage = () => {
  const router = useRouter();
  const { trick_id } = router.query;
  const [seeExample, setSeeExample] = useState(null);

  const { data: trickInfo, isSuccess } = trpc.trick.findById.useQuery({
    trick_id: trick_id as string,
  });
  const { data: combos } = trpc.trick.findCombosWithTrick.useQuery({
    trick_id: trick_id as string,
  });

  const orientation = useScreenOrientation();
  if (!isSuccess) return <div>Loading..</div>;
  return (
    <div
      className={`backrop-blur-xl no-scrollbar flex h-[100vh] w-full flex-col place-items-center gap-2 overflow-hidden overflow-y-scroll bg-zinc-900 bg-opacity-70 p-4 font-inter text-zinc-300`}
    >
      <div className="absolute left-4 top-4">
        <AnimatedSearch />
      </div>
      <div className="minimalistScroll mt-14 flex h-[80vh] w-full flex-col items-center gap-2 overflow-y-scroll rounded-md bg-zinc-900  bg-opacity-70 p-2">
        <TrickInfoGrid trickInfo={trickInfo} />
        <PreferredNames trickInfo={trickInfo} />
        <TrickNicknames trickInfo={trickInfo} />

        <div className="flex place-content-center place-items-center pb-2 pt-6">
          {trickInfo.defaultAnimation && (
            <Link
              className=" flex w-fit gap-2 rounded-md bg-zinc-800 p-2 px-4 text-xl"
              href={`/sandbox/${trickInfo?.animation?.model}/${trickInfo?.animation?.animationName}`}
            >
              <p>See it in 3d!</p>
              <div className="flex place-content-center place-items-center">
                <BiCube />
              </div>
            </Link>
          )}
        </div>
        <div
          className={`  top-2 aspect-video ${
            orientation === "landscape"
              ? "left-[5vw] h-[90vh] w-[90vw]"
              : "left-[2.5vw] h-[30vh] w-[95vw]"
          }  ${!seeExample ? " hidden" : "absolute"}`}
          id={"video-portal"}
        />
        <CombosWithTrickDisplay
          seeExample={seeExample}
          setSeeExample={setSeeExample}
          combos={combos}
          trick={trickInfo.name}
        />
      </div>
    </div>
  );
};

export default TricksPage;

const TrickNicknames = ({ trickInfo }) => {
  const uuid = useUserStore((s) => s.userInfo.uuid);
  const { data: preferredNickname } =
    trpc.trick.getPreferredNicknameByTrick.useQuery({
      trick_id: trickInfo.trick_id,
    });
  const [seeAddNicknames, setSeeAddNicknames] = useState(false);
  const { mutate: setPreferredNickname } =
    trpc.trick.setPreferredNickname.useMutation();
  const { mutate: removeNickname } = trpc.trick.removeNickname.useMutation();
  return (
    <div className="flex w-fit flex-col place-items-center  text-zinc-300">
      {trickInfo.nicknames.length > 0 ? (
        trickInfo.nicknames.map((nname) => {
          return (
            preferredNickname?.trick_nickname_id !== nname.id && (
              <div className="flex items-center gap-2" key={nname.id}>
                <p className="whitespace-nowrap">{nname.nickname}</p>
                <p className="text-xs text-zinc-400">
                  {nname.creator.username}
                </p>
                <SignedIn>
                  {nname.createdBy === uuid ? (
                    <button
                      className="rounded-md bg-red-400 bg-opacity-40 px-1 text-xs text-red-600"
                      onClick={() => removeNickname({ id: nname.id })}
                    >
                      Delete
                    </button>
                  ) : (
                    <button
                      className="rounded-md bg-zinc-400 bg-opacity-40 px-2 py-1 text-xs text-zinc-200"
                      onClick={() => setPreferredNickname({ id: nname.id })}
                    >
                      set as preffered
                    </button>
                  )}
                </SignedIn>
              </div>
            )
          );
        })
      ) : (
        <SignedIn>
          <p className="p-2 text-xs text-zinc-500">No nicknames yet</p>
        </SignedIn>
      )}
      <SignedIn>
        {!seeAddNicknames ? (
          <button
            className="m-2 rounded-md bg-zinc-400 bg-opacity-40 p-2 py-2 text-xs text-zinc-400"
            onClick={() => setSeeAddNicknames(!seeAddNicknames)}
          >
            Add Nickname
          </button>
        ) : (
          <AddNickname
            setSeeAddNicknames={setSeeAddNicknames}
            trickInfo={trickInfo}
          />
        )}
      </SignedIn>
    </div>
  );
};

const PreferredNames = ({ trickInfo }) => {
  const { data: preferredNickname } =
    trpc.trick.getPreferredNicknameByTrick.useQuery({
      trick_id: trickInfo.trick_id,
    });
  return (
    preferredNickname && (
      <div className="flex w-full flex-col place-items-center  text-zinc-300">
        <p className="text-xs text-zinc-400">Preferred Nickname</p>
        <div className="flex items-center gap-2">
          <p>{preferredNickname.nickname}</p>
        </div>
      </div>
    )
  );
};

const AddNickname = ({ trickInfo, setSeeAddNicknames }) => {
  const { register, handleSubmit } = useForm();
  const { mutate: addNickname } = trpc.trick.addNickname.useMutation();
  const onSubmit = (data) => {
    console.log({ nickname: data.nickname, trick_id: trickInfo.trick_id });
    addNickname({ nickname: data.nickname, trick_id: trickInfo.trick_id });
    setSeeAddNicknames(false);
  };
  return (
    <form
      className="
flex w-[40vw] flex-col gap-4 rounded-md bg-zinc-900 bg-opacity-70 p-2 text-zinc-300
"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        placeholder="Add a nickname"
        className="rounded-md bg-zinc-800 px-2 py-1 text-zinc-300"
        {...register("nickname")}
      />
      <button
        className="rounded-md bg-zinc-600 px-2 py-1 text-zinc-300"
        type={"submit"}
      >
        Add
      </button>
    </form>
  );
};

export const TrickInfoGrid = ({ trickInfo }) => {
  return (
    <div className=" flex w-full flex-col place-content-center place-items-center gap-2 md:left-[25vw] md:max-w-[50vw]">
      <div className="flex place-items-center gap-2 ">
        <div>
          <h1 className="text-2xl font-bold ">{trickInfo.displayName}</h1>
          <h1 className="text-normal text-center text-xs text-zinc-400 ">
            {trickInfo.name}
          </h1>
        </div>
      </div>
      <p className="rounded-lg px-2 py-1 ring-2 ring-zinc-200">
        {trickInfo.pointValue}
      </p>
      <p>{trickInfo.trickType}</p>
      <p
        className={
          "outlineButton flex w-full border-[1px] border-zinc-300 p-1 text-xs"
        }
      >
        {trickInfo.base?.name}
      </p>
      <div className="flex w-full gap-2">
        <Link
          href={`/theory/stances?stance=${trickInfo.takeoffStance}`}
          className={
            "outlineButton flex w-full border-[1px] border-sky-300 p-1 text-xs"
          }
        >
          {trickInfo.takeoffStance}
        </Link>
        <Link
          href={`/theory/stances?stance=${trickInfo.landingStance}`}
          className={
            "outlineButton flex w-full border-[1px] border-teal-300 p-1 text-xs"
          }
        >
          {trickInfo.landingStance}
        </Link>
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

const CombosWithTrickDisplay = ({
  combos,
  trick,
  seeExample,
  setSeeExample,
}) => {
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
  const ref = useClickOutside(() => setSeeExample(null));
  return (
    <>
      {seeExample === clip.id && (
        <div>
          {createPortal(
            <div
              ref={ref}
              className="no-scrollbar flex aspect-video h-full w-full overflow-clip rounded-md"
            >
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
        <Image
          alt={"user image"}
          width={24}
          height={24}
          src={user_image}
          className={"h-6 w-6 place-self-start rounded-full"}
        />
        <p>{`Clip ${i + 1}`}</p>
      </button>
    </>
  );
};
