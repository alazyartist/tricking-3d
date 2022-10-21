import React from "react";
import { redirect } from "react-router-dom";
import { useStore } from "../../../../store/store";

const Models = ({ handleClose }) => {
	const selectAnim = useStore((s) => s.selectAnim);
	const modelArray = useStore((state) => state.modelArray);
	const selectModel = useStore((s) => s.setModel);
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
							if (e === "Sam Caspio") {
								selectAnim("Cart>Full-feilong");
								selectModel(e);
								redirect(`/sandbox/${e}/Cart>Full-feilong`);
								window.history.replaceState(
									"",
									"",
									`/sandbox/${e}/Cart>Full-feilong`
								);
							} else if (e === "Frank") {
								selectAnim("Cork");
								selectModel(e);
								redirect(`/sandbox/${e}/Cork`);
								window.history.replaceState("", "", `/sandbox/${e}/Cork`);
							} else {
								selectAnim("Backflip");
								selectModel(e);
								redirect(`/sandbox/${e}/Backflip`);
								window.history.replaceState("", "", `/sandbox/${e}/Backflip`);
							}
							handleClose();
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
