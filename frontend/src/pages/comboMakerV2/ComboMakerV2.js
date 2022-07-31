import React, { useEffect, useState } from "react";
import { MdOutlineBackspace, MdOutlineClose } from "react-icons/md";
import ComboMaker from "../comboMaker/ComboMaker";
import NewComboDisplay from "../comboMaker/components/newComboDisplay";
import Tricks from "./components/Tricks";
import useComboMakerV2 from "./useComboMakerV2";

const ComboMakerV2 = () => {
	const [v2, setV2] = useState(true);
	const { currentItem, setCurrentItem, setDeleteLast, filter } =
		useComboMakerV2();

	return (
		<>
			{v2 ? (
				<div className='flex h-[90vh] w-[98vw] flex-col font-inter text-zinc-300'>
					<div
						onClick={() => setV2(!v2)}
						id='pageTitle'
						className='select-none text-2xl font-bold text-zinc-400'>
						ComboMakerV2
					</div>
					<div
						id='app-content'
						className='flex h-[80vh] w-full flex-col place-content-start place-items-center overflow-y-auto overflow-x-hidden rounded-lg  p-2 text-zinc-300 '>
						<div className='absolute top-[6.75rem] right-[2.25rem] z-[10] text-3xl text-red-300'>
							<MdOutlineBackspace onClick={() => setDeleteLast((s) => s + 1)} />
						</div>
						<NewComboDisplay newCombo={currentItem} />
						<Tricks
							filter={filter}
							setCurrentItem={setCurrentItem}
							currentItem={currentItem}
						/>
					</div>
				</div>
			) : (
				<ComboMaker setV2={setV2} v2={v2} />
			)}
		</>
	);
};

export default ComboMakerV2;
