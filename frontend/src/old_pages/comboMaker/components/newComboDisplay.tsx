import useClickOutside from "@hooks/useClickOutside";
import { trpc } from "@utils/trpc";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { TotalScore } from "types/trpc";
import { MdOutlineBackspace } from "../../../data/icons/MdIcons";
import { TrickShapeDisplay } from "../../comboMakerV2/components/SelectTrickPopup";
import TotalScoreBreakdown from "./TotalScoreBreakdown";
interface ComboDisplayProps {
  newCombo: any[];
  setDeleteLast?: any;
}
const NewComboDisplay: React.FC<ComboDisplayProps> = ({
  newCombo,
  setDeleteLast,
}) => {
  const { data: totalScore, mutate: getScore } =
    trpc.combos.getComboScore.useMutation();
  useEffect(() => {
    if (newCombo?.length > 0) {
      getScore({
        combo: newCombo,
      });
    }
  }, [newCombo]);
  const [showScoreBreakdown, setShowScoreBreakdown] = useState(false);
  const ref = useRef<HTMLDivElement>();
  // const scrollToBottom = () => {
  // 	ref?.current?.scrollIntoView({ behavior: "smooth" });
  // };
  // useEffect(() => {
  // 	scrollToBottom();
  // }, [newCombo]);

  // scrollToBottom();
  const scoreCardRef = useClickOutside(() => setShowScoreBreakdown(false));
  return (
    <>
      <p
        className={"h-8 w-24 rounded-md bg-zinc-700 p-1 text-center"}
        onClick={() => setShowScoreBreakdown(true)}
      >
        {totalScore ? totalScore?.totalScore.toFixed(2) : "TotalScore"}
      </p>
      {showScoreBreakdown && (
        <TotalScoreBreakdown ref={scoreCardRef} totalScore={totalScore} />
      )}
      <div className="m-2 flex h-[15vh] w-fit ">
        <div
          id="comboStateArr"
          className="minimalistScroll flex h-full w-[90vw] max-w-[560px]  flex-row place-content-start gap-1 overflow-x-auto rounded-lg bg-zinc-200 bg-opacity-[13%] p-2 backdrop-blur-xl"
        >
          {newCombo?.map((e, i) => (
            <div
              ref={ref}
              key={`${Math.floor(Math.random() * 1000)} + ${e?.name} + i`}
              onClick={() => console.log(e)}
              className="flex h-fit w-fit flex-row place-items-center gap-2 place-self-end text-zinc-300"
            >
              <div className="whitespace-nowrap rounded-md bg-zinc-900 bg-opacity-70 p-2">{`${
                e?.name || e || "Nope"
              }`}</div>
              {/* <TrickShapeDisplay i={i} trick={e} /> */}
              {/* <div>{`${e?.landingStance || e.toLeg || ""}`}</div> */}
            </div>
          ))}

          {newCombo.length === 0 && (
            <div className="flex h-full w-full flex-row place-items-center whitespace-nowrap p-2 text-sm text-zinc-300">
              "Choose a transition to start"
            </div>
          )}
        </div>
        <div className="relative right-[2.25rem] top-[0.1rem] z-[10] w-0 text-3xl text-red-300">
          <MdOutlineBackspace onClick={() => setDeleteLast((s) => s + 1)} />
        </div>
      </div>
    </>
  );
};

export default NewComboDisplay;
