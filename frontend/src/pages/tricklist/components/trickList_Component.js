import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

const TrickList_Component = ({ data, open,date, fn, drag_offset, swipe_left, swipe_right}) => {
	const [selectorColor, setSelectorColor] = useState();
	const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
	const left = {bg: `linear-gradient(120deg, #f093fb 0%, #f5576c 100%)`, offset: '90%'}
	const right = {bg: `linear-gradient(120deg, #96fbc4 0%, #f9f586 100%)`, offset: '7%'}
	const [{ x, bg, scale, offset }, api] = useSpring(() => ({ x: 0, scale: 1, ...left }))

	const _getStyle = () => {
		let _style = "h-[5vh] break-all w-full p-2 font-inter text-sm font-semibold text-zinc-200"
		switch(data.type) {
			case "TrickList":
				if(open) _style = _style.concat(" bg-zinc-900 rounded-lg h-[7vh]")
				else _style = _style.concat(" bg-zinc-900 rounded-full")
				break;
			case "Combo":
				if(open) _style = _style.concat(" bg-zinc-700 rounded-lg h-[8vh]")
				else _style = _style.concat(" bg-zinc-700 w-[95%]")
				break
			case "Trick":
				if(open) _style = _style.concat(" bg-zinc-500 h-[5vh] w-[90%]")
				else _style = _style.concat(" bg-zinc-600 w-[90%]")
				break
		}
		return _style.concat(" ")
	}

	const bind = useDrag(({first, initial, active, dragging, movement: [x] }) => {
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

	let label = "";
	if (data.name) {
		label = data.name;	
		label = label.concat(" : ", date);
	}
	else label = data.Combo.name;

	return (
		<animated.div
			{...bind()}
			className={`overflow-hidden z-[0] relative`}
			style={{ touchAction: "none" }}>
			{/* Colorful BAckground
					style={{ background: bg, touchAction: "none" }}>
			*/}

			{/* FLOATING BALL */}
			<animated.div 
				className={`
					w-[12px] h-[12px]	z-[1]
					rounded-full bg-white 
					absolute top-[35%] left-[50%]
				`} 
				style={{ scale: avSize, left: offset, background: selectorColor}} 
			/>

			<animated.div
				className={"relative w-full z-[2] flex flex-row justify-center items-center"}
				{...bind()}
				style={{ x, touchAction: "none" }}>
				<button
					onClick={() => fn()}
					className={_getStyle()}
				>
					{label}
				</button>
			</animated.div>
		</animated.div>
	);
};


export default TrickList_Component;
