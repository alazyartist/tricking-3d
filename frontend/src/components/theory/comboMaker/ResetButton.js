import React from "react";

function ResetButton({ resetTricklist, deleteLast }) {
	return (
		<>
			<div
				id='ResetButton'
				className='m-2 rounded-lg bg-rose-600 p-2 py-1 text-sm text-zinc-800'
				onClick={() => resetTricklist()}>
				Reset
			</div>
			<div
				id='deleteLastElement'
				className='m-2 rounded-lg bg-rose-600 p-2 py-1  text-zinc-800'
				onClick={() => deleteLast()}>
				Remove LastTrick
			</div>
		</>
	);
}

export default ResetButton;
