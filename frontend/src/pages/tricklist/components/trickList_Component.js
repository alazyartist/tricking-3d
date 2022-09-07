import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { useStore } from "../../../store/store.js";

const TrickList_Component = ({ name, date, fn, drag_offset, swipe_left, swipe_right}) => {
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

	const bind = useDrag(({ initial, active, dragging, movement: [x] }) => {
		if (dragging) {
			x = clamp(x, -drag_offset, drag_offset);
			setSelectorColor("white");
			if (x >  drag_offset*0.8) setSelectorColor(left.bg);
			else 
			if (x < -drag_offset*0.8) setSelectorColor(right.bg);
		}
		/* Release Touch */
		else {
			if (x >  drag_offset*0.8)  {
				swipe_right();
			}
			else 
			if (x < -drag_offset*0.8) {
				swipe_left();
			}
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
			className={`overflow-hidden h-full w-full z-[0] rounded-md relative`}
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
				<button
					onClick={() => fn()}
					className='break-all w-full rounded-md bg-blue-500 p-2 font-inter text-sm font-semibold text-zinc-200'>
					{name} | {date}
				</button>
			</animated.div>
		</animated.div>
	);
};


export default TrickList_Component;

