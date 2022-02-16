import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { useStore } from "../store/store";
function AnimationDropdown(props) {
	function AnimDrop(props) {
		const [open, setOpen] = useState(false);
		return (
			<li>
				<a
					href='#'
					onClick={() => setOpen(!open)}
					className='flex items-center justify-center text-center align-middle'>
					<FaAngleDown />
					Anim
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
								href='#'
								className='flex h-[50px] items-center rounded-xl bg-white text-black'
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
			<div className='top-[58px] basis-full gap-1 rounded-xl bg-sky-500 p-1'>
				<>
					<Animations></Animations>
				</>
			</div>
		);
	}

	return (
		<nav className='mt-10 rounded-xl bg-red-500 p-1'>
			<ul className=' h-full w-full '>
				<AnimDrop>
					<Dropdown></Dropdown>
				</AnimDrop>
			</ul>
		</nav>
	);
}

export default AnimationDropdown;
