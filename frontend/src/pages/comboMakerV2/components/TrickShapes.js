import React, { useEffect, useState } from "react";
import {
	BaseLine,
	SetupShape,
	TricksShape,
	TransitionShape,
	StanceShape,
} from "./SVGTrickShapes";

const TrickShapes = ({
	allTricks,
	lastItem,
	setCurrentItem,
	filteredTricks,
}) => {
	const [activeDropdown, setActiveDropdown] = useState("");
	return (
		<>
			<div className=' flex h-fit w-[98vw] flex-wrap place-content-center place-items-end gap-2 text-zinc-300'>
				<SetupShape
					onClick={() => setActiveDropdown("Transitions")}
					className={
						" top-0 h-fit w-fit flex-shrink-0 fill-zinc-300 stroke-zinc-300"
					}
				/>
				<TricksShape
					onClick={() => setActiveDropdown("Trick")}
					className={
						" top-0 h-fit w-fit flex-shrink-0 fill-zinc-300 stroke-zinc-300"
					}
				/>
				<StanceShape
					onClick={() => setActiveDropdown("Stance")}
					className={
						" top-0 h-fit w-fit flex-shrink-0 fill-zinc-300 stroke-zinc-300"
					}
				/>
				<TransitionShape
					onClick={() => setActiveDropdown("Transition")}
					className={
						" top-0 h-fit w-fit flex-shrink-0 fill-zinc-300 stroke-zinc-300"
					}
				/>
				{/*
				<BaseLine
					className={" top-0 h-fit w-1/4 flex-shrink-0 stroke-zinc-300"}
				/>{" "}
				*/}
			</div>
			{activeDropdown === "Trick" && (
				<div className='no-scrollbar absolute bottom-[10vh] left-[10vw] flex h-[60vh] w-[80vw] flex-col place-items-center gap-2 overflow-y-scroll rounded-xl bg-zinc-900 bg-opacity-80 p-4 backdrop-blur-md'>
					{allTricks?.map((trick) =>
						trick.type === "Trick" ? (
							<div
								onClick={() => {
									setCurrentItem((s) => [...s, trick]);
									setActiveDropdown("");
								}}
								key={trick.trick_id}>
								{trick.name}
							</div>
						) : null
					)}
				</div>
			)}
			{activeDropdown === "Transition" && (
				<div className='no-scrollbar absolute bottom-[10vh] left-[10vw] flex h-[60vh] w-[80vw] flex-col place-items-center gap-2 overflow-y-scroll rounded-xl bg-zinc-900 bg-opacity-80 p-4 backdrop-blur-md'>
					{allTricks?.map((trick) =>
						trick.type === "Transition" ? (
							<div
								onClick={() => {
									setCurrentItem((s) => [...s, trick]);
									setActiveDropdown("");
								}}
								key={trick.trick_id}>
								{trick.name}
							</div>
						) : null
					)}
				</div>
			)}
			{activeDropdown === "Stance" && (
				<div className='no-scrollbar absolute bottom-[10vh] left-[10vw] flex h-[60vh] w-[80vw] flex-col place-items-center gap-2 overflow-y-scroll rounded-xl bg-zinc-900 bg-opacity-80 p-4 backdrop-blur-md'>
					{allTricks?.map((trick) =>
						trick.type === "Stance" ? (
							<div
								onClick={() => {
									setCurrentItem((s) => [...s, trick]);
									setActiveDropdown("");
								}}
								key={trick.trick_id}>
								{trick.name}
							</div>
						) : null
					)}
				</div>
			)}
		</>
	);
};

export default TrickShapes;

export const TrickShapeDisplay = ({ trick, i }) => {
	return (
		<div className='flex h-fit w-fit overflow-hidden'>
			{trick.type === "Transition" && i === 0 && (
				<SetupShape
					title={trick?.name}
					className={" top-0 fill-zinc-300 stroke-zinc-300"}
				/>
			)}
			{trick.type === "Trick" && (
				<TricksShape
					title={trick?.name}
					className={" top-0 fill-zinc-300 stroke-zinc-300"}
				/>
			)}{" "}
			{trick.type === "Stance" && (
				<StanceShape
					title={trick?.name}
					className={" top-0 fill-zinc-300 stroke-zinc-300"}
				/>
			)}{" "}
			{trick.type === "Transition" && i !== 0 && (
				<TransitionShape
					title={trick?.name}
					className={" top-0 fill-zinc-300 stroke-zinc-300"}
				/>
			)}
		</div>
	);
};
