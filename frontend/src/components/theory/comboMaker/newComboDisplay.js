import React from "react";

function NewComboDisplay({ newCombo }) {
	return (
		<div className='m-2 flex h-full w-full flex-grow'>
			<div
				id='comboStateArr'
				className='no-scrollbar flex max-h-[20vh] w-full max-w-full flex-row flex-wrap place-content-start overflow-x-auto rounded-lg bg-zinc-200 bg-opacity-[13%] pt-2 backdrop-blur-xl'>
				{newCombo?.map((e, i) => (
					<div
						key={`${Math.floor(Math.random() * 1000)} + ${e.name} + i`}
						onClick={() => console.log(e)}
						className='flex h-fit w-fit flex-row place-items-center p-2 pr-0 pt-0 text-zinc-300'>
						<div>{`${e?.name || e || "Nope"}`}</div>
					</div>
				))}

				{newCombo.length == 0 && (
					<div className='flex h-full w-full flex-row place-items-center whitespace-nowrap p-2 text-sm text-zinc-300'>
						"Choose a trick, stance, or transition to start"
					</div>
				)}
			</div>
		</div>
	);
}

export default NewComboDisplay;
