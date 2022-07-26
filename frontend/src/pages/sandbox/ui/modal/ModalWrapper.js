import React from "react";
import { AiOutlineClose, AiOutlineCloseCircle } from "react-icons/ai";

function ModalWrapper({ handleClose, children }) {
	return (
		<>
			<div
				id='trick-info-modal-bg'
				className='fixed top-0 left-0 h-full w-full'>
				<div
					className='absolute top-[1.25rem] right-[6rem] z-[1010] text-4xl text-zinc-300'
					onClick={(e) => handleClose(e)}>
					<AiOutlineCloseCircle />
				</div>
				{children}
			</div>
			<div className='fixed top-0 left-0 z-[-1] h-full w-full bg-zinc-800 bg-opacity-40 filter backdrop-blur-md'></div>
		</>
	);
}

export default ModalWrapper;
