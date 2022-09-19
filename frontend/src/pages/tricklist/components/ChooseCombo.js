import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { useTransition, animated } from "react-spring";
import { useAddCombo, useGetCombos } from "../../../api/useTricklists";
import { useUserStore } from "../../../store/userStore";

const ChooseCombo = ({ setOpen, open, tricklist_id }) => {
	const userInfo = useUserStore((s) => s.userInfo);
	const [showCombo, setShowCombo] = useState(false);
	const [cname, setCname] = useState("");
	const [addedCombo, setAddedCombo] = useState();

	const { mutate: addComboDB, isSuccess } = useAddCombo(
		tricklist_id,
		userInfo.uuid
	);
	const { data: comboArr } = useGetCombos();

	const handleClick = (e) => {
		if (e.target.id === "addItemBackground") {
			setOpen(false);
		}
	};
	const addItemAnim = useTransition(addedCombo, {
		from: { top: -40, opacity: 0 },
		enter: { top: 0, opacity: 100 },
		leave: { opacity: 0 },
		config: { durration: 300, tension: 260, friction: 50 },
	});

	useEffect(() => {
		if (isSuccess) {
			setAddedCombo(true);
			setTimeout(() => {
				setAddedCombo(false);
			}, 1000);
		}
		console.log(isSuccess);
	}, [isSuccess]);
	return (
		<div
			onClick={(e) => handleClick(e)}
			id='addItemBackground'
			className='max-h-[30vh] w-[80vw]'>
			{/*
					//className=' place-content-center place-items-center sticky top-0 left-0 flex h-full w-full rounded-xl bg-zinc-800 bg-opacity-40'>
					//<div className='place-content-center place-items-center flex flex-col'>
					*/}
			<div className='flex flex-col place-content-center place-items-center'>
				{addItemAnim(
					(styles, succeeded) =>
						succeeded && (
							<animated.div className={"absolute top-0"} style={styles}>
								<div className='relative -top-10 h-full w-full rounded-lg bg-emerald-500 p-1'>
									added combo
								</div>
							</animated.div>
						)
				)}
				<div className='flex place-items-center p-1 text-2xl font-bold'>
					<div onClick={() => setOpen(false)}>
						<IoIosArrowBack />
					</div>

					<div>Choose Combo to Add</div>
				</div>
				<div className='no-scrollbar max-h-[25vh] w-full overflow-scroll rounded-lg p-2'>
					<div className='flex flex-col gap-4'>
						{Array.isArray(comboArr) &&
							comboArr.length > 0 &&
							comboArr.map((combo) => (
								<div
									// onPointerEnter={() => setShowCombo(true)}
									// onPointerLeave={() => setShowCombo(false)}
									className='neumorphic flex flex-col rounded-md bg-zinc-700 p-1'
									key={combo.combo_id.substring(24)}
									onClick={() => {
										addComboDB({
											tricklist_id: tricklist_id,
											user_id: userInfo.uuid,
											combo_id: combo.combo_id,
										});
										console.log(combo);
									}}>
									<div className='flex place-content-center place-items-center justify-between p-2'>
										<div>{combo.name}</div>
										{/* <div>
										{combo?.defaultAnimation && (
											<FaCheck className='text-emerald-500' />
										)}
									</div> */}
									</div>
									<div className='flex'>
										{combo.comboArray &&
											showCombo &&
											combo.comboArray.map((item) => (
												<div>{item.name}&gt;</div>
											))}
									</div>
								</div>
							))}
					</div>
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
