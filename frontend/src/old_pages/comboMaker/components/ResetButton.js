import React from "react";

function ResetButton({ resetTricklist, deleteLast }) {
	return (
		<div className='flex place-items-center'>
			<div
				id='ResetButton'
				className='m-2 rounded-lg bg-red-600 bg-opacity-70 p-2 py-1 text-sm font-semibold text-zinc-300'
				onClick={() => resetTricklist()}>
				Reset
			</div>
			<div
				id='deleteLastElement'
				className='m-2 w-fit rounded-lg bg-red-600 bg-opacity-70 p-2 py-1 text-sm font-semibold  text-zinc-300'
				onClick={() => deleteLast()}>
				Remove LastTrick
			</div>
		</div>
	);
}

export default ResetButton;
