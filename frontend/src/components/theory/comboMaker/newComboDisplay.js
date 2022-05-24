import React from "react";

function NewComboDisplay({ newCombo }) {
	return (
		<div
			id='comboStateArr'
			className='m-2 flex flex-row flex-wrap gap-y-2 rounded-lg bg-gradient-to-tr from-sky-600 to-sky-500'>
			{newCombo?.map((e, i) => (
				<>
					<div
						key={i + e}
						onClick={() => console.log(e)}
						className='flex w-fit flex-row p-2 pr-0 text-zinc-300'>
						<div>{`${e?.name || e || "Nope"}`}</div>
					</div>
				</>
			))}
		</div>
	);
}

export default NewComboDisplay;
