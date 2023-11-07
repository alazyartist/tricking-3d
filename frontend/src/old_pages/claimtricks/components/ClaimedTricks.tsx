import React, { useState } from "react";
import { MdCircle, MdCheckCircle } from "../../../data/icons/MdIcons";
import { tricks } from "@prisma/client";
import { trpc } from "@utils/trpc";
interface ClaimTrickProps {
  displayOnly?: boolean;
  user_id: string;
  trick_id: string;
  trick: tricks;
  sortType: string;
}
const ClaimedTricks = ({
  displayOnly,
  user_id,
  trick_id,
  trick,
  sortType,
}: ClaimTrickProps) => {
  const [claimed, setClaimed] = useState(false);
  const { mutate: claim } = trpc.trick.claimTrick.useMutation();
  const { data: profileInfo } = trpc.userDB.findByUUID.useQuery({
    userid: user_id,
  });
  const isClaimed = profileInfo?.TricksClaimed?.some(
    (combo) => combo.trick_id === trick_id
  );
  console.log(profileInfo);

  const handleClaim = async () => {
    isClaimed
      ? claim({ action: "Unclaim", user_id, trick_id })
      : claim({ action: "Claim", user_id, trick_id });
  };
  return sortType === "Claimed" ? (
    !!isClaimed && (
      <div
        key={trick.trick_id}
        className=" grid h-full w-full grid-cols-5 place-content-center justify-between rounded-xl p-2 odd:bg-zinc-700"
      >
        <div className="col-span-3 flex place-items-center">{trick?.name}</div>
        <div className="col-span-1 flex place-items-center">{trick?.type}</div>
        <div className="relative col-span-1 flex h-full place-content-end place-items-center gap-2">
          <div
            onClick={() => {
              // console.log(
              // "Claim",
              // listItem?.Combo.combo_id,
              // listItem.Combo.name)}
              setClaimed(!claimed);
              !displayOnly && handleClaim();
            }}
            className="h-full w-8 text-3xl text-emerald-500"
          >
            {isClaimed ? (
              <MdCheckCircle />
            ) : (
              <MdCircle className="text-yellow-500" />
            )}
          </div>
        </div>
      </div>
    )
  ) : (
    <div
      key={trick.trick_id}
      className=" grid h-full w-full grid-cols-5 place-content-center justify-between rounded-xl p-2 odd:bg-zinc-700"
    >
      <div className="col-span-3 flex place-items-center">{trick?.name}</div>
      <div className="col-span-1 flex place-items-center">{trick?.type}</div>
      <div className="relative col-span-1 flex h-full place-content-end place-items-center gap-2">
        <div
          onClick={() => {
            // console.log(
            // "Claim",
            // listItem?.Combo.combo_id,
            // listItem.Combo.name)}
            setClaimed(!claimed);
            !displayOnly && handleClaim();
          }}
          className="h-full w-8 text-3xl text-emerald-500"
        >
          {isClaimed ? (
            <MdCheckCircle />
          ) : (
            <MdCircle className="text-yellow-500" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ClaimedTricks;
