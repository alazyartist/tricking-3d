import React, { useState } from "react";
import { MdInfo, MdInfoOutline } from "react-icons/md";
import { useStore } from "../../../store/store";
import TrickInfo from "../../../components/info/TrickInfo";
import Animations from "./modal/Animations";
import Models from "./modal/Models";
import AnimationsDropwdown from "./AnimationsDropwdown";
import InfoButton from "./InfoButton";
import ModalWrapper from "./modal/ModalWrapper";
import ModelDropdown from "./ModelDropdown";
import ModalButton from "./modal/ModalButton";
import Versions from "./modal/Versions";

const ModalNav = () => {
	//global states
	const currentAnim = useStore((s) => s.currentAnim);
	const currentModel = useStore((s) => s.activeModel);
	const currentVersions = useStore((s) => s.currVersions);

	//local states
	const [open, setOpen] = useState(false);
	const [activeView, setActiveView] = useState(0);

	function getViewContent(caseNum) {
		switch (caseNum) {
			case 0:
				return <Animations />;
			case 1:
				return <TrickInfo />;
			case 2:
				return <Models />;
			case 3:
				return <Versions />;
			default:
				return null;
		}
	} //takes care of rendering stateful logic when switching views

	const handleOpen = (caseNum) => {
		setActiveView(caseNum);
		setOpen(!open);
	};

	const handleClose = () => {
		setActiveView();
		setOpen(false);
	};

	return (
		<div
			id='dropdowns-div'
			className='max-h-750px maw-w-[90vw] absolute z-[1006] ml-3 mt-[45px] flex flex-col gap-3'>
			{/**original version w/ collisions */}
			{/* <AnimationsDropwdown />
      <InfoButton />*/}
			{/* <ModelDropdown className='z-40' /> */}

			{/**new version w/o collisions */}
			{/**animations button */}
			<ModalButton
				handleOpen={() => {
					handleOpen(0);
				}}
				content={currentAnim}
				isDropdown
			/>
			{/**trickInfo button */}
			<ModalButton
				handleOpen={() => handleOpen(1)}
				content={
					activeView === 1 ? (
						<MdInfo className='fill-zinc-300 text-3xl' />
					) : (
						<MdInfoOutline className='fill-zinc-300 text-3xl' />
					)
				}
				f={() => handleOpen(1)}
			/>
			{/**models button*/}
			<ModalButton
				handleOpen={() => handleOpen(2)}
				content={currentModel}
				isDropdown
			/>
			{/**versions button*/}
			<ModalButton
				handleOpen={() => handleOpen(3)}
				content={"Versions"}
				isDropdown
			/>

			{open && (
				<ModalWrapper handleClose={handleClose}>
					{getViewContent(activeView)}
				</ModalWrapper>
			)}
		</div>
	);
};

export default ModalNav;
