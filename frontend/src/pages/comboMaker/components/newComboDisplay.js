import React, { useEffect, useRef } from "react";
import { MdOutlineBackspace } from "../../../data/icons/MdIcons";
import { TrickShapeDisplay } from "../../comboMakerV2/components/TrickShapes";

function NewComboDisplay({ newCombo, setDeleteLast }) {
	const ref = useRef();
	// const scrollToBottom = () => {
	// 	ref?.current?.scrollIntoView({ behavior: "smooth" });
	// };
	// useEffect(() => {
	// 	scrollToBottom();
	// }, [newCombo]);

	// scrollToBottom();
	return (
		<>
			{newCombo.reduce((sum, b) => sum + b.pointValue, 0)}
			<div className='m-2 flex h-full w-fit '>
				<div
					id='comboStateArr'
					className='no-scrollbar flex h-[18vh] w-[85vw] max-w-[560px]  flex-row place-content-start overflow-x-auto rounded-lg bg-zinc-200 bg-opacity-[13%] backdrop-blur-xl'>
					{newCombo?.map((e, i) => (
						<div
							ref={ref}
							key={`${Math.floor(Math.random() * 1000)} + ${e?.name} + i`}
							onClick={() => console.log(e)}
							className='flex h-fit w-fit flex-row place-items-center place-self-end text-zinc-300'>
							{/* <div>{`${e?.name || e || "Nope"}`}</div> */}
							<TrickShapeDisplay i={i} trick={e} />
							{/* <div>{`${e?.landingStance || e.toLeg || ""}`}</div> */}
						</div>
					))}

					{newCombo.length == 0 && (
						<div className='flex h-full w-full flex-row place-items-center whitespace-nowrap p-2 text-sm text-zinc-300'>
							"Choose a trick, stance, or transition to start"
						</div>
					)}
				</div>
				<div className='relative top-[0.1rem] right-[2.25rem] z-[10] w-0 text-3xl text-red-300'>
					<MdOutlineBackspace onClick={() => setDeleteLast((s) => s + 1)} />
				</div>
			</div>
		</>
	);
}

export default NewComboDisplay;
