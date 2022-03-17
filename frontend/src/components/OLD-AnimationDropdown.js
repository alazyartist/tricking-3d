import React, { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { useStore } from "../store/store";
function AnimationDropdown(props) {
	const currentAnim = useStore((state) => state.currentAnim);
	const selectAnim = useStore((state) => state.selectAnim);
	const activeModel = useStore((state) => state.activeModel);
	function DropdownButton(props) {
		const [open, setOpen] = useState(false);
		return (
			<li id='animations-dropdown-list'>
				<button
					id='animations-dropdown-link'
					onClick={() => setOpen(!open)}
					className='flex w-full items-center justify-center text-center align-middle text-2xl font-semibold text-zinc-300 hover:text-green-500'>
					<FaAngleDown className={"hover:fill-gray-600"} />
					{props.name}
				</button>

				{open && props.children}
			</li>
		);
	}

	function ModelSelector(props) {
		const modelArray = useStore((state) => state.modelArray);
		const setModel = useStore((state) => state.setModel);

		return (
			<>
				{modelArray.map((e, i) => {
					return (
						<button
							id='dropdown-item'
							className='mt-2 mb-2 flex h-[50px] w-full items-center justify-around rounded-xl bg-zinc-400 text-base font-black text-gray-800 hover:bg-[gainsboro] active:bg-green-600'
							onClick={() => {
								selectAnim("Backflip");
								setModel(e);
								selectAnim("Backflip");
							}}
							key={i}>
							{e}
						</button>
					);
				})}
			</>
		);
	}
	function Dropdown() {
		function Animations(props) {
			const animationsArray = useStore((state) => state.animationsArray);
			console.log("current Anim", currentAnim);
			return (
				<>
					{animationsArray.map((e, i) => {
						return (
							<button
								id='dropdown-item'
								className='mt-2 mb-2 flex h-[50px] w-full items-center justify-around rounded-xl bg-zinc-400 text-base font-black text-gray-800 hover:bg-[gainsboro] active:bg-green-600'
								onClick={() => selectAnim(e)}
								key={i}>
								{e}
							</button>
						);
					})}
				</>
			);
		}

		//Dropdown Button Return
		return (
			<>
				<div
					id='dropdown-content-container'
					className='no-scrollbar relative mt-6 max-h-[300px] basis-full overflow-y-auto rounded-xl border-[8px] border-gray-800 bg-gray-800 p-1 md:max-h-80'>
					<Animations></Animations>
				</div>
			</>
		);
	}
	//Returns Animated Dropdown and Children
	return (
		<nav
			id='animations-dropdown-container'
			className='sticky h-fit rounded-xl bg-gray-800 p-1'>
			<ul>
				<DropdownButton name={activeModel}>
					<div
						id='dropdown-content-container'
						className='no-scrollbar relative mt-6 max-h-[300px] basis-full overflow-y-auto rounded-xl border-[8px] border-gray-800 bg-gray-800 p-1 md:max-h-80'>
						<ModelSelector></ModelSelector>
					</div>
				</DropdownButton>
			</ul>
			<ul id='animations-dropdown-header' className=' h-full w-full '>
				<DropdownButton name={currentAnim}>
					<Dropdown></Dropdown>
				</DropdownButton>
			</ul>
		</nav>
	);
}

export default AnimationDropdown;
