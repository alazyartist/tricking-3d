import { useUserStore } from "@store/userStore";
import React, { useEffect, useState } from "react";
import { trpc } from "utils/trpc";
import { MdCheckCircle } from "../../../data/icons/MdIcons";
import useDebounce from "../../../hooks/useDebounce";

const TrickPointEditor = () => {
  const { data: trickParts, isLoading } = trpc.trick.getTrickParts.useQuery();
  const { data: transitions } = trpc.trick.findAllTransitions.useQuery();
  if (isLoading) return <p>Loading...</p>;
  console.log(window?.screen?.orientation?.angle);
  return (
    <div
      className={`no-scrollbar grid ${
        window?.screen?.orientation?.angle > 0 ? "grid-cols-3" : "grid-cols-1"
      } no-scrollbar h-[80vh] w-[95vw] gap-3 overflow-hidden overflow-y-scroll text-xs md:w-[80vw] md:flex-wrap`}
    >
      <div className="no-scrollbar h-[35vh] w-full min-w-[100px] overflow-y-scroll">
        <div className="sticky top-0 grid grid-cols-4 place-items-center gap-2 bg-zinc-900">
          <div className="col-span-2 place-self-start pl-1 pt-1 text-2xl">
            Bases
          </div>
          <p className="col-start-4 place-self-center p-1">pointValue</p>
        </div>
        {trickParts?.length &&
          trickParts
            ?.filter((a) => a.type === "Base")
            ?.sort((a, b) => {
              if (a.name > b.name) return 1;
              if (a.name < b.name) return -1;
              return 0;
            })
            ?.map((trick) => {
              return <PointInput trick={trick} />;
            })}
      </div>
      <div className="no-scrollbar h-[35vh] w-full min-w-[100px] overflow-y-scroll">
        <div className="sticky top-0 grid grid-cols-4 place-items-center gap-2 bg-zinc-900">
          <div className="col-span-2 place-self-start pl-1 pt-1 text-2xl">
            Stances
          </div>
          <p className="col-start-4 place-self-center p-1">pointValue</p>
        </div>
        {trickParts?.length &&
          trickParts
            ?.filter((a) => a.type === "Stance")
            ?.sort((a, b) => {
              if (a.name > b.name) return 1;
              if (a.name < b.name) return -1;
              return 0;
            })
            ?.map((trick) => {
              return <PointInput trick={trick} />;
            })}
      </div>
      <div className="no-scrollbar h-[35vh] w-full min-w-[100px] overflow-y-scroll">
        {/* <div className="sticky top-0 bg-zinc-900 pl-1 pt-1 text-2xl">
          Variations
        </div> */}
        <div className="sticky top-0 grid grid-cols-4 place-items-center gap-2 bg-zinc-900">
          <div className="col-span-2 place-self-start pl-1 pt-1 text-2xl">
            Variations
          </div>
          <p className="col-start-4 place-self-center p-1">pointValue</p>
        </div>
        {trickParts?.length &&
          trickParts
            ?.filter((a) => a.type === "Variation")
            ?.sort((a, b) => {
              if (a.name > b.name) return 1;
              if (a.name < b.name) return -1;
              return 0;
            })
            ?.map((trick) => {
              return <PointInput trick={trick} />;
            })}
      </div>
      <div className="no-scrollbar h-[35vh] w-full min-w-[100px] overflow-y-scroll">
        <div className="sticky top-0 grid grid-cols-4 place-items-center gap-2 bg-zinc-900">
          <div className="col-span-2 place-self-start pl-1 pt-1 text-2xl">
            Transitions
          </div>
          <p className="place-self-center p-1">pointValue</p>
          <p className="place-self-center p-1">multiplier</p>
        </div>
        {transitions?.length &&
          transitions
            ?.filter((t) => t.type === "Transition")
            ?.map((trick) => {
              return <PointInput trick={trick} />;
            })}
      </div>
    </div>
  );
};

export default TrickPointEditor;

const PointInput = ({ trick }) => {
  const [pointValue, setPointValue] = useState(trick?.pointValue);
  const [multiplierValue, setMultiplierValue] = useState(trick?.multiplier);
  const { mutateAsync: updateMultiplier, status: mStatus } =
    trpc.transition.updateMultiplier.useMutation();
  const { mutate: updatePoints, data } =
    trpc.trick.updateTrickPartPoints.useMutation();
  const debouncedPointValue = useDebounce(parseFloat(pointValue), 500);
  const debouncedMultiplierValue = useDebounce(
    parseFloat(multiplierValue),
    500
  );
  const [saved, setSaved] = useState(false);
  const adminAccess = useUserStore((s) => s.userInfo.adminAccess);
  useEffect(() => {
    if (data === "UpdatedPointValue" || mStatus === "success") {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } else {
      setSaved(false);
    }
  }, [data, mStatus]);
  useEffect(() => {
    if (trick.type === "Transition") {
      if (multiplierValue !== trick?.multiplier) {
        updateMultiplier({
          tid: trick.id,
          multiplier: debouncedMultiplierValue,
        });
      }
    }
    if (pointValue !== trick?.pointValue) {
      if (trick.type === "Transition") {
        updatePoints({
          pointValue: debouncedPointValue,
          type: trick.type,
          id: trick.id,
        });
        return;
      } else if (trick.type === "Variation") {
        updatePoints({
          pointValue: debouncedPointValue,
          type: trick.type,
          id: trick.id,
        });
        return;
      } else if (trick.type === "Stance") {
        updatePoints({
          pointValue: debouncedPointValue,
          type: trick.type,
          id: trick.stance_id,
        });
        return;
      } else if (trick.type === "Base") {
        updatePoints({
          pointValue: debouncedPointValue,
          type: "Base",
          id: trick.base_id,
        });
        return;
      }
    }
  }, [debouncedPointValue, debouncedMultiplierValue]);
  return (
    // <div className="flex place-items-center justify-between gap-2 p-1 odd:bg-zinc-800 odd:bg-opacity-70 even:bg-zinc-900 even:bg-opacity-70">
    <div className="grid grid-cols-4 place-items-start gap-2 p-1 odd:bg-zinc-800 odd:bg-opacity-70 even:bg-zinc-900 even:bg-opacity-70">
      <div onClick={() => console.log(trick)} className="col-span-2 w-fit">
        {trick?.name}
      </div>
      {saved && (
        <MdCheckCircle className={"relative left-2 text-emerald-500"} />
      )}
      <input
        disabled={adminAccess < 4}
        onChange={(e) => setPointValue(e.target.value)}
        value={pointValue}
        className={`${
          trick.type === "Transition" ? "col-start-3" : "col-start-4"
        } w-full place-self-center bg-transparent p-1 text-center text-zinc-300`}
      />

      {trick.type === "Transition" && (
        <input
          disabled={adminAccess < 4}
          onChange={(e) => setMultiplierValue(e.target.value)}
          value={multiplierValue}
          className="col-start-4 w-full place-self-center bg-transparent p-1 text-center text-zinc-500"
        />
      )}
    </div>
  );
};
