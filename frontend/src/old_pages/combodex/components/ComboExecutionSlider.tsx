import React, { useState } from "react";
import { useDrag } from "@use-gesture/react";
import { useSpring, animated } from "react-spring";
const ComboExecutionSlider = ({ executionScore, setExecutionScore }) => {
  // Local Functions>>>
  let drag_offset_limit = 70;
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

  const clamp = (num: number, min: number, max: number) =>
    Math.min(Math.max(num, min), max);
  const lerp = (start: number, end: number, amt: number) =>
    (1 - amt) * start + amt * end;

  // Set the drag hook and define component movement based on gesture data
  const bind: any = useDrag(
    ({ currentTarget, first, last, dragging, down, movement: [mx, my] }) => {
      if (dragging) {
        my = 0;
        mx = clamp(mx, -drag_offset_limit, drag_offset_limit);
        setExecutionScore(
          lerp(0.01, 1, (mx + drag_offset_limit) / (drag_offset_limit * 2))
        );
      }

      api.start({ x: down ? mx : 0, y: down ? my : 0, immediate: down });
    }
  );
  return (
    <>
      <div className="flex w-full flex-col place-items-center">
        <animated.div
          className={
            "absolute bottom-5 left-5 z-[-1] flex h-fit w-full place-content-center place-items-center"
          }
          style={{ scale: executionScore * 5 }}
        >
          &#128293;
        </animated.div>
        <div className="relative z-[-1] h-3 w-[140px] translate-y-[18px] rounded-md bg-teal-700" />
        <animated.div {...bind()} style={{ x, y, touchAction: "none" }}>
          <div className="h-6 w-10 rounded-md bg-teal-400"></div>
        </animated.div>
      </div>
    </>
  );
};

export default ComboExecutionSlider;
