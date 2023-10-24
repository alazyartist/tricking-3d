import { useDrag } from "@use-gesture/react";
import React from "react";
import { animated, useSpring, config } from "@react-spring/web";

const MovingPoint = ({ movePoint, api3 }) => {
  return (
    <animated.div
      // onClick={(e) => {
      // 	let rnd = Math.random() > 0.5;
      // 	api3.start({
      // 		from: { x: rnd ? 89 : -89, y: 333, opacity: 1 },
      // 		to: {
      // 			x: 0,
      // 			y: 0,
      // 			opacity: 0,
      // 			backgroundColor: rnd ? "#ec4899" : "#06b6d4",
      // 		},
      // 	});
      // }}
      className={
        "absolute h-[35px] w-[35px] touch-none rounded-full bg-amber-300"
      }
      style={{
        ...movePoint,
        opacity: movePoint.opacity.to([0, 0.05, 0.5, 0.95, 1], [0, 1, 1, 1, 0]),
      }}
    ></animated.div>
  );
};

export default MovingPoint;
