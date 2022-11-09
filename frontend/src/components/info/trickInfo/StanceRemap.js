import React, { useState } from "react";
const StanceRemap = ({ stance, trickMaker }) => {
	const textcolor = {
		Backside: `text-[#07b9e9]`,
		Inside: `text-[#06d8b7]`,
		Outside: `text-[#10b35d]`,
		Frontside: `text-[#003eb3]`,
		BacksideComplete: `text-[#7EE0FB]`,
		OutsideComplete: `text-[#75FBB3]`,
		OutsideSemi: `text-[#2db36c]`,
		FrontsideSemi: `text-[#2b5ab3]`,
		FrontsideMega: `text-[#4171ca]`,
		InsideMega: `text-[#40baa6]`,
		InsideHyper: `text-[#5ed8c5]`,
		BacksideHyper: `text-[#6bcee9]`,
	};
	const [showFullStance, setShowFullStance] = useState(false);

	return trickMaker ? (
		<div>
			<div className={`${textcolor[stance]} p-2 text-center text-3xl`}>
				{stance}
			</div>
		</div>
	) : (
		<div>
			<div
				onClick={() => setShowFullStance(!showFullStance)}
				className={`${textcolor[stance]} p-2 text-center text-3xl`}>
				{stance?.replace(/[a-z]/g, "")}
			</div>
			<div
				className={`${textcolor[stance]} absolute flex translate-x-[-30%] translate-y-[-70px] place-content-center p-2 text-center text-sm`}>
				{showFullStance && stance}
			</div>
		</div>
	);
};

export default StanceRemap;
