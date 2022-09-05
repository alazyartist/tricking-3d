import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import Claimed from "./Claimed";
import {
	useDeleteCombo,
	useGetTricklistDetailsById,
} from "../../../api/useTricklists.js";
import { useUserStore } from "../../../store/userStore";
import { useStore } from "../../../store/store";
import { useTransition, animated, config } from "react-spring";

const TricklistbyIdDetails = ({
	openView,
	displayOnly,
	tricklist_id,
	data,
	setOpenView,
	addItemopen,
	open,
}) => {
	const { uuid } = useUserStore((s) => s.userInfo);
	let updated = new Date(data?.updatedAt);
	updated = updated.toDateString();
	const [editing, setEditing] = useState(false);
	const [comboName, setComboName] = useState(data?.name);
	const setModel = useStore((s) => s.setModel);
	const selectAnim = useStore((s) => s.selectAnim);
	const setTimescale = useStore((s) => s.setTimescale);
	const { data: tricklistData } = useGetTricklistDetailsById(
		tricklist_id,
		uuid
	);
	const { mutate: deleteComboById } = useDeleteCombo();

	useEffect(() => {
		setComboName(data?.name);
	}, [data]);

	const handleUpdateAnim = (listItem) => {
		setTimescale(0.89);
		setModel(listItem?.Combo?.Animation?.model);
		selectAnim(listItem?.Combo?.Animation?.animationName);
	};
	const editViewArrow = useTransition(editing, {
		from: { translateX: "-200px", opacity: 0 },
		enter: { translateX: "0px", opacity: 1 },
		leave: { translateX: "-200px", opacity: 0 },
		reverse: editing,
		config: { duration: 300, ...config.molasses },
		exitBeforeEnter: true,
	});
	const editView = useTransition(editing, {
		from: { translateX: "100px", opacity: 0 },
		enter: { translateX: "0px", opacity: 1 },
		leave: { translateX: "100px", opacity: 0 },
		reverse: editing,
		config: { duration: 300, ...config.molasses },
		exitBeforeEnter: true,
	});

	return (
		<div className='h-full'>
			<div>
				{editViewArrow(({ opacity, translateX }, editing) =>
					editing ? (
						<animated.div style={{ opacity, translateX }}>
							<input
								type='text'
								className='bg-inherit font-inter text-2xl font-bold'
								value={comboName}
								onChange={(e) => setComboName(e.target.value)}
							/>
						</animated.div>
					) : (
						<animated.div
							style={(translateX, opacity)}
							onChange={(e) => console.log(e)}
							// contentEditable='true'
							className='place-items-center flex gap-1 font-inter text-2xl font-bold text-zinc-300'>
							<div onClick={() => setOpenView(false)}>
								{openView && !addItemopen && <IoIosArrowBack />}
							</div>
							<div>{data?.name}</div>
						</animated.div>
					)
				)}
			</div>
			<div>
				{!addItemopen && (
					<div className='place-content-center flex h-[35vh] flex-col  pt-4'>
						<div
							id={"data-container"}
							className='flex gap-8 text-base text-zinc-300'>
							<div className=''>{data?.Owner?.username}</div>
							<div>{updated}</div>
							{!displayOnly && (
								<div
									className={`${editing ? "text-red-500" : "text-zinc-300"}`}
									onClick={() => setEditing(!editing)}>
									Edit
								</div>
							)}
						</div>
						{/* TricklistData shoul be [{},{}] */}
						<div className=' no-scrollbar flex h-full flex-shrink-0 flex-col gap-2 overflow-y-scroll'>
							<div className='no-scrollbar flex flex-shrink-0 flex-col gap-2 '>
								{Array.isArray(tricklistData) &&
									tricklistData.map((listItem) => {
										return (
											<div
												onClick={() => {
													handleUpdateAnim(listItem);
												}}
												id={"tricklistData-map-container"}
												key={
													listItem.combo_id + Math.floor(Math.random() * 1000)
												}
												className='place-items-center flex h-full justify-between gap-2 overflow-hidden rounded-xl bg-zinc-900  p-2'>
												<div>{listItem?.Combo?.name}</div>
												{editView((styles, editing) =>
													editing ? (
														<animated.div
															style={styles}
															onClick={() => deleteComboById(listItem)}
															className='h-8 w-8 place-items-end text-3xl text-red-500'>
															<AiOutlineClose />
														</animated.div>
													) : (
														<animated.div style={styles}>
															<Claimed
																displayOnly={displayOnly}
																user_id={uuid}
																combo_id={listItem?.combo_id}
																combo={listItem}
															/>
														</animated.div>
													)
												)}
											</div>
										);
									})}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default TricklistbyIdDetails;
