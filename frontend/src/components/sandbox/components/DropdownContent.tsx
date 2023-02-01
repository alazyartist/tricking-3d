import React from "react";

function DropdownContent({ children }) {
	return (
		<>
			<div
				id='trick-info-modal-bg'
				className='bg-blue-700 h-full w-full '>
				{children}
			</div>
		</>
	);
}

export default DropdownContent;
