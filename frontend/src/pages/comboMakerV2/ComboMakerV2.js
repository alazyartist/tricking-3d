import React, { useState } from "react";
import ComboMaker from "../comboMaker/ComboMaker";
import NewComboDisplay from "../comboMaker/components/newComboDisplay";
import ComboStructure from "./components/ComboStructure";
import SaveCombo from "./components/SaveCombo";
import Tricks from "./components/Tricks";
import useComboMakerV2 from "./useComboMakerV2";
import useSaveCombo from "./useSaveCombo";

const ComboMakerV2 = () => {
	const [v2, setV2] = useState(true);
	const { currentItem, setDeleteLast, setCurrentItem, filteredTricks } =
		useComboMakerV2();
	const { save, setSave, comboName, setComboName } = useSaveCombo(currentItem);

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
						<SaveCombo
							save={save}
							setSave={setSave}
							setComboName={setComboName}
							comboName={comboName}
						/>
						<NewComboDisplay
							setDeleteLast={setDeleteLast}
							newCombo={currentItem}
						/>
						<Tricks
							setCurrentItem={setCurrentItem}
							filteredTricks={filteredTricks}
						/>
						<ComboStructure />
					</div>
				</div>
			) : (
				// comboMaker original
				<ComboMaker setV2={setV2} v2={v2} />
			)}
		</>
	);
};

export default ComboMakerV2;
