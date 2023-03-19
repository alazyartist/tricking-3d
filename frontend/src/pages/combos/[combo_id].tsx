import { trpc } from "@utils/trpc";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const TricksPage = () => {
  const router = useRouter();
  const { combo_id } = router.query;
  const { data: comboInfo, isSuccess } = trpc.combos.findById.useQuery({
    combo_id: combo_id as string,
  });
  if (!isSuccess) return <div>Loading..</div>;
  return (
    <div
      className={`backrop-blur-xl no-scrollbar flex h-[95vh] w-full flex-col place-items-center gap-2 overflow-hidden overflow-y-scroll bg-zinc-900 bg-opacity-70 p-4 font-inter text-zinc-300`}
    >
      <div className="flex place-items-center gap-2">
        <h1 className="text-xl ">{comboInfo.name}</h1>
        <p>{comboInfo.pointValue}</p>
      </div>
      <p>{comboInfo.shorthand}</p>
    </div>
  );
};

export default TricksPage;
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
