import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useAddCombo, useGetCombos } from "../../../api/useTricklists";
import { useUserStore } from "../../../store/userStore";

const ChooseCombo = ({ setOpen, open, tricklist_id }) => {
	const userInfo = useUserStore((s) => s.userInfo);
	const [showCombo, setShowCombo] = useState(false);
	const [cname, setCname] = useState("");

	const { mutate: addComboDB } = useAddCombo(tricklist_id, userInfo.uuid);
	const { data: comboArr } = useGetCombos();

	const handleClick = (e) => {
		if (e.target.id === "addItemBackground") {
			setOpen(false);
		}
	};
	return (
		<div
			onClick={(e) => handleClick(e)}
			id='addItemBackground'
			className='place-content-center place-items-center absolute top-0 left-0 flex h-full w-full bg-zinc-800 bg-opacity-40 backdrop-blur-md'>
			<div className='place-content-center place-items-center flex flex-col'>
				<div className='p-1 text-2xl font-bold'>Choose Combo to Add</div>
				<div className='no-scrollbar flex h-[40vh] w-[80vw] flex-col gap-2 overflow-y-auto'>
					{Array.isArray(comboArr) &&
						comboArr.length > 0 &&
						comboArr.map((combo) => (
							<div
								onTouchStart={() => setShowCombo(true)}
								onTouchEnd={() => setShowCombo(false)}
								className='rounded-md bg-zinc-800 p-1'
								key={combo.combo_id.substring(24)}
								onClick={() => {
									addComboDB({
										tricklist_id: tricklist_id,
										user_id: userInfo.uuid,
										combo_id: combo.combo_id,
									});
									console.log(combo);
								}}>
								<div className='place-content-center place-items-center flex justify-between'>
									<div>{combo.name}</div>
									<div>
										{combo?.defaultAnimation && (
											<FaCheck className='text-emerald-500' />
										)}
									</div>
								</div>
								<div className='flex'>
									{combo.comboArray &&
										showCombo &&
										combo.comboArray.map((item) => <div>{item.name}&gt;</div>)}
								</div>
							</div>
						))}
				</div>
				{/* <input
					className='my-2 rounded-xl p-1 pl-2 text-zinc-800'
					onChange={(e) => setCname(e.target.value)}
					type={"text"}
					value={cname}
				/> */}
			</div>
		</div>
	);
};

export default ChooseCombo;
