import React from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../../../store/store";

const Models = () => {
	const selectAnim = useStore((s) => s.selectAnim);
	const modelArray = useStore((state) => state.modelArray);
	const selectModel = useStore((s) => s.setModel);
	const navigate = useNavigate();
	return (
		<div
			className='no-scrollbar fixed top-[10vh] left-[10vw] 
        h-[85vh] w-[80vw] flex-col items-center justify-center overflow-y-auto 
        rounded-2xl py-6 sm:pr-6 md:pr-4 lg:pr-[5rem]'>
			{modelArray?.map((e, i) => {
				return (
					<button
						id='dropdown-item'
						className='mt-1 mb-2 flex h-fit w-full justify-center rounded-lg font-inter text-xl font-light text-zinc-200 hover:text-zinc-400'
						onClick={() => {
							selectAnim("Backflip");
							selectModel(e);
							navigate(`/sandbox/${e}/Backflip`);
						}}
						key={i}>
						{e}
					</button>
				);
			})}
		</div>
	);
};

export default Models;
