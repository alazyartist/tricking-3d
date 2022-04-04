import React, { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
function Dropdown(props) {
	const [open, setOpen] = useState(false);
	function DropdownButton(props) {
		return (
			<li id='dropdown-list' className='flex w-fit flex-col'>
				<button
					id='dropdown-link'
					onClick={() => setOpen(!open)}
					className='flex w-full items-center justify-center  text-center align-middle text-2xl font-semibold text-zinc-300 '>
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
								className='mt-1 mb-2 flex h-fit w-full justify-center rounded-lg font-inter text-xl font-light text-zinc-200 hover:text-zinc-400'
								onClick={() => {
									props.f(e);
									setOpen();
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
					className='no-scrollbar fixed top-16 left-[6vw] mt-2 h-fit w-fit overflow-y-auto rounded-xl p-4 '>
					<div
						id='dropped-content'
						className='left-[10vw] h-[80vh] w-[80vw] justify-center rounded-2xl p-2 '>
						<DroppedContent
							buttonMap={props.buttonMap}
							f={props.f}></DroppedContent>
					</div>
				</div>
			</>
		);
	}
	//Returns Animated Dropdown and Children
	return (
		<>
			<nav
				id='dropdown-container'
				className=' h-fit w-fit rounded-xl p-1 hover:bg-opacity-40'>
				<ul id='animations-dropdown-header' className='h-full w-full '>
					<DropdownButton name={props.buttonName}>
						<Dropped buttonMap={props.buttonMap} f={props.f}></Dropped>
					</DropdownButton>
				</ul>
			</nav>
			{open && (
				<div
					id='trick-info-modal-bg'
					className='fixed top-0 left-0 z-[-1] h-full w-full bg-zinc-800 bg-opacity-40 filter backdrop-blur-md'
					onClick={() => setOpen(!open)}></div>
			)}
		</>
	);
}

export default Dropdown;
