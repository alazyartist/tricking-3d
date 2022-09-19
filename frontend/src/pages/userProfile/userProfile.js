import React, { useState, useEffect } from "react";
import { MdOutlineClose } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useTransition, animated } from "react-spring";
import useUserInfoByUUID from "../../api/useUserInfoById";
import { useUserStore } from "../../store/userStore";
import ProfileInfoCard from "./components/ProfileInfoCard";
import ProfileInfoCardEditable from "./components/ProfileInfoCardEditable";
import TricklistsAndClamiedContainer from "./components/TricklistsAndClaimedContainer";
import UserAvatarDisplay from "./components/UserAvatarDisplay";
import TricklistPage from "../tricklist/TricklistPage";

import { useStore } from "../../store/store.js";
import AddListButton from "../tricklist/components/AddListButton";
import AddComboItemToTricklist from "../tricklist/components/AddComboItemToTricklist";

const UserProfile = () => {
	const { uuid } = useParams();
	const { uuid: loggedInUUID } = useUserStore((s) => s.userInfo);
	const { data: profileInfo } = useUserInfoByUUID(uuid);
	const selected = useStore((s) => s.selected_TrickList);
	const [editing, setEditing] = useState(false);
	const editView = useTransition(editing, {
		from: { top: -400, opacity: 0 },
		enter: { top: 0, opacity: 100 },
		leave: { top: -400 },
		reverse: editing,
		config: { durration: 300, tension: 260, friction: 50 },
		exitBeforeEnter: true,
	});
	const isUsersPage = uuid === loggedInUUID;
	/* addNewList/Combo */
	const [addItemopen, setAddItemopen] = useState(false);
	const [openNewList, setOpenNewList] = useState(false);

	useEffect(() => {
		console.log("Current(uP): ", selected);
	}, [selected]);

	return (
		<div className='m-4  pt-[3.4rem] font-inter text-zinc-300'>
			<div className=' flex flex-row justify-between gap-4 pb-4'>
				<div className='flex flex-col'>
					{editView((styles, editing) =>
						editing ? (
							<animated.div
								style={styles}
								className='relative flex flex-col place-items-center gap-2'>
								<ProfileInfoCardEditable
									setEditing={setEditing}
									userInfo={profileInfo}
								/>
								{isUsersPage && (
									<>
										{editing}
										<div
											className='flex place-content-center place-items-center gap-1'
											onClick={() => setEditing(!editing)}>
											<MdOutlineClose /> <div>Close</div>
										</div>
									</>
								)}
							</animated.div>
						) : (
							<animated.div
								style={styles}
								className='relative flex flex-col place-items-center gap-2'>
								<ProfileInfoCard userInfo={profileInfo} />
								{isUsersPage && (
									<>
										{editing}
										<div onClick={() => setEditing(!editing)}>Edit Info</div>
									</>
								)}
							</animated.div>
						)
					)}
				</div>
				<UserAvatarDisplay />
			</div>

			<div className='flex w-full flex-col place-items-center rounded-lg'>
				{/* @TODO: Wrap this with profile info container */}
				<TricklistsAndClamiedContainer
					profileuuid={uuid}
					MyTricklists={profileInfo?.MyTricklists}
					ClaimedCombos={profileInfo?.CombosClaimed}
					ClaimedTricks={profileInfo?.TricksClaimed}
				/>
			</div>

			{/* <div className='fixed bottom-0 flex max-h-[30vh] min-h-[10vh] w-[90vw] items-center justify-center rounded-lg border-t-4 border-zinc-900 bg-zinc-700'>
				{!selected && (
					<AddListButton setOpen={setOpenNewList} open={openNewList} />
				)}
				{selected && (
					<AddComboItemToTricklist
						tricklist_id={selected.tricklist_id}
						addItemopen={addItemopen}
						setAddItemopen={setAddItemopen}
					/>
				)}
			</div> */}
		</div>
	);
};

export default UserProfile;
