import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { useStore } from "../store/store";
function AnimationDropdown(props) {
	function AnimDrop(props) {
		const [open, setOpen] = useState(false);
		return (
			<li>
				<a
					onClick={() => setOpen(!open)}
					id='dropbutton'
					className=' flex items-center justify-center text-center align-middle text-2xl text-white'>
					<FaAngleDown />
					Animations
				</a>

				{open && props.children}
			</li>
		);
	}
	function Dropdown() {
		function Animations(props) {
			const animationsArray = useStore((state) => state.animationsArray);
			const addAnim = useStore((state) => state.selectAnim);
			const currentAnim = useStore((state) => state.currentAnim);
			console.log("current", currentAnim);
			return (
				<>
					{animationsArray.map((e, i) => {
						return (
							<a
								id='item'
								className='mt-2 mb-2 flex h-[50px] items-center justify-around rounded-xl bg-[whitesmoke] text-base text-black hover:bg-[gainsboro]'
								onClick={() => addAnim(e)}
								key={i}>
								{e}
							</a>
						);
					})}
				</>
			);
		}

		return (
			<div
				id='dropdownDiv'
				className='no-scrollbar relative mt-6 max-h-[300px] basis-full overflow-y-auto rounded-xl border-[8px] border-gray-800 bg-gray-800 p-1 md:max-h-80'>
				<>
					<Animations></Animations>
				</>
			</div>
		);
	}

	return (
		<nav className=' sticky top-0 mt-8 h-[50px] rounded-xl bg-gray-800 p-1'>
			<ul className=' h-full w-full '>
				<AnimDrop>
					<Dropdown></Dropdown>
				</AnimDrop>
			</ul>
		</nav>
	);
}

export default AnimationDropdown;
