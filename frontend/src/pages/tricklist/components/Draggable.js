import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { useStore } from "../../../store/store.js";

export const DragableWrapper = ({ children, drag_offset_left, swipe_left, swipe_right }) => {
	//const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
	const [subBtnBg, setSubBtnBg] = useState();
	const [selectorColor, setSelectorColor] = useState();
	const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

	const left = {
		bg: `linear-gradient(120deg, #f093fb 0%, #f5576c 100%)`,
		offset: '90%',
	}
	const right = {
		bg: `linear-gradient(120deg, #96fbc4 0%, #f9f586 100%)`,
		offset: '7%',
	}

	const [{ x, bg, scale, offset }, api] = useSpring(() => ({
		x: 0,
		scale: 1,
		...left,
	}))

	const bind = useDrag(({ active, dragging, movement: [x] }) => {
		if (dragging) {
			setSelectorColor("white");
			if (x >  150) setSelectorColor(left.bg);
			else 
			if (x < -150) setSelectorColor(right.bg);
		}
		/* Release Touch */
		else {
			if (x < -150) swipe_left();
			else 
			if (x > 150) swipe_right();
		}

		api.start({
			x: active ? x : 0,
			scale: active ? 1.1 : 1,
			...(x < 0 ? left : right),
			immediate: name => active && name === 'x',
		})
	});

	const avSize = x.to({
		map: Math.abs,
		range: [50, 200],
		output: [1, 2],
		extrapolate: 'clamp',
	});

	return (
		<animated.div
			{...bind()}
			className={`h-full w-full z-[0] rounded-md relative`}
			style={{ background: bg, touchAction: "none" }}>

			<animated.div 
				className={`
					w-[12px] h-[12px]	z-[1]
					rounded-full bg-white 
					absolute top-[35%] left-[50%]
				`} 
				style={{ scale: avSize, left: offset, background: selectorColor}} 
			/>

			<animated.div
				className={"relative h-full w-full z-[2]"}
				{...bind()}
				style={{ x, touchAction: "none" }}>
				{children}
			</animated.div>
		</animated.div>
	);
};


export default DragableWrapper;
