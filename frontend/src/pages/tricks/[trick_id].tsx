import { trpc } from "@utils/trpc";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const TricksPage = () => {
  const router = useRouter();
  const { trick_id } = router.query;
  const { data: trickInfo, isSuccess } = trpc.trick.findById.useQuery({
    trick_id: trick_id as string,
  });
  if (!isSuccess) return <div>Loading..</div>;
  return (
    <div
      className={`backrop-blur-xl no-scrollbar flex h-[95vh] w-full flex-col place-items-center gap-2 overflow-hidden overflow-y-scroll bg-zinc-900 bg-opacity-70 p-4 font-inter text-zinc-300`}
    >
      <div className="flex place-items-center gap-2">
        <h1 className="text-xl ">{trickInfo.name}</h1>
        <p>{trickInfo.pointValue}</p>
      </div>
      <p>{trickInfo.trickType}</p>
      <p>{trickInfo.base.name}</p>
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
    </div>
  );
};

export default TricksPage;
