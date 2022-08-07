import React, { useEffect, useState } from "react";
import useApiCreds from "../../../hooks/useApiCreds";
import { useUserStore } from "../../../store/userStore";

const ChooseTrick = ({ setOpen, open, tricklist_id }) => {
	const userInfo = useUserStore((s) => s.userInfo);
	const apiPrivate = useApiCreds();
	const [comboArr, setComboArr] = useState([]);
	const [cname, setCname] = useState("");
	const addComboDB = async (combo_id) => {
		try {
			apiPrivate.post(`/tricklist/user/${tricklist_id}`, {
				tricklist_id: tricklist_id,
				uuid: userInfo.uuid,
				combo_id: combo_id,
			});
		} catch (err) {
			console.log(err);
		}
	};

	const getAllCombos = async () => {
		try {
			apiPrivate
				.get(`/combo`, {})
				.then((responseData) => {
					console.log("RESPONSE FROM CHOOSE TRICK", responseData);
					setComboArr(responseData.data);
				})
				.catch((err) => console.log(err));
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getAllCombos();
	}, []);

	const handleClick = (e) => {
		if (e.target.id === "addItemBackground") {
			setOpen(false);
		}
	};
	return (
		<div
			onClick={(e) => handleClick(e)}
			id='addItemBackground'
			className='absolute top-0 left-0 flex h-full w-full place-content-center place-items-center bg-zinc-800 bg-opacity-40 backdrop-blur-md'>
			<div className='flex flex-col place-content-center place-items-center'>
				<div className='p-1 text-2xl font-bold'>Choose Combo to Add</div>
				<div className='no-scrollbar flex h-[40vh] w-[80vw] flex-col gap-2 overflow-y-auto'>
					{comboArr.map((combo) => (
						<div
							className='rounded-md bg-zinc-800 p-1'
							key={combo.combo_id.substring(24)}
							onClick={() => {
								addComboDB(combo.combo_id);
								console.log(combo);
							}}>
							{combo.name}
						</div>
					))}
				</div>
				<input
					className='my-2 rounded-xl p-1 pl-2 text-zinc-800'
					onChange={(e) => setCname(e.target.value)}
					type={"text"}
					value={cname}
				/>
				{/* <div
					onClick={() => addComboDB()}
					className='w-full rounded-xl bg-sky-400'>
					Add Item
				</div> */}
			</div>
		</div>
	);
};

export default ChooseTrick;
