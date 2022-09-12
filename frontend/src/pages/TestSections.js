import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useSpring, animated, config } from "react-spring";
import useMeasure from "react-use-measure";
const TestSections = () => {
	const [changeHeight, setChangeHeight] = useState({
		ht1: "20vh",
		ht2: "60vh",
		ht3: "20vh",
	});
	const [lastSelected, setLast] = useState();
	// const [ref1, bounds] = useMeasure();
	const ref1 = useRef();
	const ref2 = useRef();
	const ref3 = useRef();

	const { ht1, ht2, ht3 } = useSpring({
		onChange: () => {
			lastSelected.current.scrollIntoView({
				block: "nearest",
				inline: "end",
				behavior: "smooth",
			});
		},
		to: {
			ht1: changeHeight.ht1,
			ht2: changeHeight.ht2,
			ht3: changeHeight.ht3,
		},
		config: { ...config.wobbly },
	});
	useEffect(() => {
		// ref3.current.scrollIntoView({
		// 	block: "end",
		// 	inline: "end",
		// 	behavior: "smooth",
		// });
	}, [changeHeight, setChangeHeight]);
	return (
		<div
			id={"flex"}
			className=' no-scrollbar h-[100vh] w-full  overflow-y-scroll text-xl text-zinc-300'>
			<animated.div
				ref={ref1}
				onClick={() => {
					setLast(ref1);
					setChangeHeight({
						...changeHeight,
						ht1: changeHeight.ht1 === "40vh" ? "20vh" : "40vh",
					});
				}}
				style={{ height: ht1 }}
				className='h-[20vh] w-full   bg-zinc-600'>
				TestSections1
			</animated.div>
			<animated.div
				ref={ref2}
				onClick={() => {
					setLast(ref2);
					setChangeHeight({
						...changeHeight,
						ht2: changeHeight.ht2 === "80vh" ? "60vh" : "80vh",
					});
				}}
				style={{ height: ht2 }}
				className='h-[60vh] w-full   bg-zinc-500'>
				TestSections2
			</animated.div>
			<animated.div
				ref={ref3}
				onClick={() => {
					setLast(ref3);
					setChangeHeight({
						...changeHeight,
						ht3: changeHeight.ht3 === "40vh" ? "20vh" : "40vh",
					});
				}}
				style={{ height: ht3 }}
				className='h-[20vh] w-full    bg-zinc-700'>
				TestSections3
			</animated.div>
		</div>
	);
};

export default TestSections;
