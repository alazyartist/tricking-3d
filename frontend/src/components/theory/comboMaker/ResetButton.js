import React from "react";

function ResetButton({ resetTricklist, deleteLast }) {
	return (
		<>
			<div
				id='ResetButton'
				className='m-2 rounded-lg bg-gradient-to-tr from-red-600 to-red-700 p-2 py-1 text-sm font-semibold text-zinc-300'
				onClick={() => resetTricklist()}>
				Reset
			</div>
			<div
				id='deleteLastElement'
				className='m-2 rounded-lg bg-gradient-to-tr from-red-600 to-red-700 p-2 py-1 font-semibold  text-zinc-300'
				onClick={() => deleteLast()}>
				Remove LastTrick
			</div>
		</>
	);
}

export default ResetButton;
