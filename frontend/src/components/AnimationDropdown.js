import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { useStore } from "../store/store";
function AnimationDropdown(props) {
	function AnimDrop(props) {
		const [open, setOpen] = useState(false);
		return (
			<li id='animations-dropdown-list'>
				<button
					id='animations-dropdown-link'
					onClick={() => setOpen(!open)}
					className='flex w-full items-center justify-center text-center align-middle text-2xl font-semibold text-zinc-300'>
					<FaAngleDown />
					Animations
				</button>

				{open && props.children}
			</li>
		);
	}
	function Dropdown() {
		function Animations(props) {
			const animationsArray = useStore((state) => state.animationsArray);
			const selectAnim = useStore((state) => state.selectAnim);
			const currentAnim = useStore((state) => state.currentAnim);
			console.log("current", currentAnim);
			return (
				<>
					{animationsArray.map((e, i) => {
						return (
							<button
								id='dropdown-item'
								className='mt-2 mb-2 flex h-[50px] w-full items-center justify-around rounded-xl bg-zinc-400 text-base font-black text-gray-800 hover:bg-[gainsboro]'
								onClick={() => selectAnim(e)}
								key={i}>
								{e}
							</button>
						);
					})}
				</>
			);
		}

		return (
			<div
				id='dropdown-content-container'
				className='no-scrollbar relative mt-6 max-h-[300px] basis-full overflow-y-auto rounded-xl border-[8px] border-gray-800 bg-gray-800 p-1 md:max-h-80'>
				<>
					<Animations></Animations>
				</>
			</div>
		);
	}
	//Returns Animated Dropdown and Children
	return (
		<nav
			id='animations-dropdown-container'
			className='sticky h-[50px] rounded-xl bg-gray-800 p-1'>
			<ul id='animations-dropdown-header' className=' h-full w-full '>
				<AnimDrop>
					<Dropdown></Dropdown>
				</AnimDrop>
			</ul>
		</nav>
	);
}

export default AnimationDropdown;
