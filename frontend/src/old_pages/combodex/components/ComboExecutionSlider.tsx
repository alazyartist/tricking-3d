import React, { useEffect, useState } from "react";
import { useDrag } from "@use-gesture/react";
import { useSpring, animated } from "@react-spring/web";
import { trpc } from "utils/trpc";
import { useUserStore } from "@store/userStore";
const ComboExecutionSlider = ({
  executionScore,
  setExecutionScore,
  sessionData,
}) => {
  // Local Functions>>>
  let drag_offset_limit = 70;
  const userInfo = useUserStore((s) => s.userInfo);
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
  const utils = trpc.useContext();
  const { mutateAsync: updateExecutionScore } =
    trpc.sessionsummaries.updateExecutionScore.useMutation({
      onSuccess(input) {
        console.log("im running on success");
        utils.sessionsummaries.invalidate();
      },
    });
  const clamp = (num: number, min: number, max: number) =>
    Math.min(Math.max(num, min), max);
  const lerp = (start: number, end: number, amt: number) =>
    (1 - amt) * start + amt * end;

  // Set the drag hook and define component movement based on gesture data
  const bind: any = useDrag(
    ({ currentTarget, first, last, dragging, down, movement: [mx, my] }) => {
      if (dragging) {
        my = executionScore;
        mx = clamp(mx, -drag_offset_limit, drag_offset_limit);
        setExecutionScore(
          lerp(-0.5, 1, (mx + drag_offset_limit) / (drag_offset_limit * 2))
        );
      }
      if (last) {
        updateExecutionScore({
          userid: userInfo.uuid as string,
          sessiondataid: sessionData.id,
          executionScore,
        });
      }

      api.start({ x: down ? mx : 0, y: down ? my : 0, immediate: down });
    }
  );
  // useEffect(() => {
  //   setTimeout(
  //     () => console.log("i reran", last),
  //   );
  // }, [executionScore]);
  return (
    <div className="grid min-h-[120px] grid-cols-2 place-items-center">
      <animated.div
        className={
          " z-[-1] flex h-fit w-fit place-content-center place-items-center overflow-visible"
        }
        style={{ scale: executionScore * 5 }}
      >
        &#128293;
      </animated.div>
      <div className="flex w-full flex-col place-items-center">
        <div className="relative z-[-1] h-3 w-[140px] translate-y-[18px] rounded-md border-2 border-amber-700" />
        <animated.div {...bind()} style={{ x, y, touchAction: "none" }}>
          <div className="h-6 w-10 rounded-md bg-orange-200 bg-opacity-50 backdrop-blur-xl"></div>
        </animated.div>
      </div>
    </div>
  );
};

export default ComboExecutionSlider;
