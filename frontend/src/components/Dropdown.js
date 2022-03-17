import React, { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
function Dropdown(props) {
	function DropdownButton(props) {
		const [open, setOpen] = useState(false);
		return (
			<li id='dropdown-list'>
				<button
					id='dropdown-link'
					onClick={() => setOpen(!open)}
					className='flex w-full items-center justify-center text-center align-middle text-2xl font-semibold text-zinc-300 hover:text-gray-800'>
					<FaAngleDown className={"hover:fill-gray-600"} />
					{props.name}
				</button>

				{open && props.children}
			</li>
		);
	}

	function Dropped(props) {
		function DroppedContent(props) {
			return (
				<>
					{props.buttonMap?.map((e, i) => {
						return (
							<button
								id='dropdown-item'
								className='mt-1 mb-2 flex h-fit w-full items-center justify-around rounded-xl bg-zinc-400 bg-opacity-50 text-base font-black text-gray-800 hover:bg-[gainsboro] active:bg-green-600'
								onClick={() => {
									props.f(e);
								}}
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
					className='no-scrollbar relative mt-6 max-h-[300px] overflow-y-auto rounded-xl p-1 md:max-h-80'>
					<DroppedContent
						buttonMap={props.buttonMap}
						f={props.f}></DroppedContent>
				</div>
			</>
		);
	}
	//Returns Animated Dropdown and Children
	return (
		<nav
			id='dropdown-container'
			className='sticky h-fit rounded-xl p-1 hover:bg-slate-50 hover:bg-opacity-40'>
			<ul id='animations-dropdown-header' className=' h-full w-full '>
				<DropdownButton name={props.buttonName}>
					<Dropped buttonMap={props.buttonMap} f={props.f}></Dropped>
				</DropdownButton>
			</ul>
		</nav>
	);
}

export default Dropdown;
