import React, { useState } from "react";
import { MdCircle, MdCheckCircle } from "../../../data/icons/MdIcons";
import {
  combos,
  sessiondata,
  sessionsources,
  transitions,
  tricks,
} from "@prisma/client";
import { trpc } from "@utils/trpc";
import { ProfileInfo } from "types/trpc";
import { FaPlay, FaPlayCircle } from "react-icons/fa";
import { useDashStore } from "@store/dashStore";
interface ClaimTrickProps {
  displayOnly?: boolean;
  user_id: string;
  trick_id: string;
  trick: tricks;
  sortType: string;
  profileInfo: ProfileInfo;
  uniqueTricks: string[];
  uniqueTricksRaw: {};
  clips: (sessiondata & { ClipLabel: combos; SessionSource: sessionsources })[];
}
const ClaimedTricks = ({
  displayOnly,
  user_id,
  trick_id,
  trick,
  profileInfo,
  uniqueTricks,
  sortType,
  uniqueTricksRaw,
  clips,
}: ClaimTrickProps) => {
  const [claimed, setClaimed] = useState(false);
  const [seeClips, setSeeClips] = useState(false);
  const { mutate: claim } = trpc.trick.claimTrick.useMutation();

  const isClaimed = profileInfo?.TricksClaimed?.some(
    (combo) => combo.trick_id === trick_id
  );
  const setVidsrc = useDashStore((s) => s.setVidSrc);
  const setClipStart = useDashStore((s) => s.setClipStart);
  const setClipEnd = useDashStore((s) => s.setClipEnd);
  const handlePlay = (clip) => {
    setVidsrc(clip.SessionSource.vidsrc);
    setClipStart(clip.clipStart);
    setClipEnd(clip.clipEnd);
  };
  const foundClips = clips?.filter((clip) => {
    const comboArray = clip?.ClipLabel?.comboArray as unknown as tricks[];
    if (!comboArray) return false;
    return comboArray.some((combo) => combo?.trick_id === trick_id);
  });
  const isProven = uniqueTricks.includes(trick.name);

  // const { data:combos } = trpc.trick.findCombosWithTrick.useQuery({
  //   trick_id: trick.trick_id,
  // });
  const handleClaim = async () => {
    isClaimed
      ? claim({ action: "Unclaim", user_id, trick_id })
      : claim({ action: "Claim", user_id, trick_id });
  };
  const isVisible = sortType === "Claimed" ? !!isProven : true;
  return (
    isVisible && (
      <div
        key={trick.trick_id}
        className={` ${
          isProven ? "border-green-500" : "border-yellow-500"
        } grid h-full w-full grid-cols-4 place-content-center justify-between rounded-md border-l-4 bg-zinc-800 bg-opacity-40 p-2`}
      >
        <div
          onClick={() => setSeeClips((p) => !p)}
          className="col-span-3 flex place-items-center justify-between"
        >
          <p>{trick?.name}</p>
        </div>
        <div className="relative col-span-1 flex h-full place-content-end place-items-center gap-2">
          <p className="pr-4">{uniqueTricksRaw?.[trick?.name]}</p>
          <div
            onClick={() => {
              if (isProven) return;
              setClaimed(!claimed);
              !displayOnly && handleClaim();
            }}
            className="h-full w-8 text-3xl text-green-800"
          >
            {isClaimed || isProven ? (
              <MdCheckCircle
                className={`${isProven ? "fill-green-500" : ""}`}
              />
            ) : (
              <MdCircle className="text-yellow-500" />
            )}
          </div>
        </div>
        {seeClips && (
          <div className="col-span-4 space-y-1">
            {Array.isArray(foundClips) &&
              foundClips?.map((clip) => {
                return (
                  <div className="flex w-full" key={clip.id}>
                    <button onClick={() => handlePlay(clip)} className="pr-2">
                      <FaPlayCircle />
                    </button>
                    <p className="no-scrollbar w-full overflow-hidden overflow-x-scroll whitespace-nowrap rounded-md bg-zinc-600 bg-opacity-40 p-2 text-xs">
                      {clip?.ClipLabel?.name}
                    </p>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    )
  );
};

export default ClaimedTricks;
