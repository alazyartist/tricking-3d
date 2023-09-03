import React, { useEffect, useState } from "react";
import { MdCircle, MdCheckCircle } from "../../../data/icons/MdIcons";
import { useClaimTrick, useUnClaimTrick } from "../../../api/useClaimTricks";
import useUserInfoByUUID from "../../../api/useUserInfoById";
import { tricks } from "@prisma/client";
interface ClaimTrickProps {
  displayOnly?: boolean;
  user_id: string;
  trick_id: string;
  trick: tricks;
  sortType: string;
}
const ClaimedTricks: React.FC<ClaimTrickProps> = ({
  displayOnly,
  user_id,
  trick_id,
  trick,
  sortType,
}) => {
  const [claimed, setClaimed] = useState(false);
  const { mutate: claim } = useClaimTrick();
  const { mutate: unclaim } = useUnClaimTrick();
  const { data: profileInfo } = useUserInfoByUUID(user_id);
  const isClaimed = profileInfo?.TricksClaimed?.some(
    (combo) => combo.trick_id === trick_id
  );

  const handleClaim = async () => {
    isClaimed ? unclaim({ user_id, trick_id }) : claim({ user_id, trick_id });
  };
  return sortType === "Claimed" ? (
    isClaimed && (
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
