import React, { useState, useEffect } from "react";
import { MdInfo, MdInfoOutline, MdSettings } from "react-icons/md";
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
import Settings from "./modal/Settings";

const ModalNav = () => {
	//global states
	const currentAnim = useStore((s) => s.currentAnim);
	const currentModel = useStore((s) => s.activeModel);
	const currentVersions = useStore((s) => s.currVersions);

	//local states
	const [open, setOpen] = useState(false);
	const [visible, setVisible] = useState(true);
	const [activeView, setActiveView] = useState(0);

	const handleOpen = (caseNum) => {
		setActiveView(caseNum);
		setOpen(true);
		setVisible(false);
	};

	const handleClose = () => {
		setActiveView();
		setOpen(false);
		setVisible(true);
	};
	// useEffect(() => {
	// 	setOpen(false);
	// 	setVisible(true);
	// }, [currentAnim, currentModel]);
	function getViewContent(caseNum) {
		switch (caseNum) {
			case 0:
				return <Animations handleClose={handleClose} />;
			case 1:
				return <TrickInfo />;
			case 2:
				return <Models handleClose={handleClose} />;
			case 3:
				return <Versions handleClose={handleClose} />;
			case 4:
				return <Settings />;
			default:
				return null;
		}
	} //takes care of rendering stateful logic when switching views

	return (
		<div
			id='dropdowns-div'
			className='max-h-750px maw-w-[90vw] absolute z-[1006] ml-3 flex'>
			{/**original version w/ collisions */}
			{/* <AnimationsDropwdown />
      <InfoButton />*/}
			{/* <ModelDropdown className='z-40' /> */}

			{/**new version w/o collisions */}
			{/**animations button */}

			{!visible && activeView !== 1 && (
				<div className='absolute top-2 left-2 text-3xl font-bold text-zinc-300'>
					{activeView === 4 ? "Settings" : currentAnim}
				</div>
			)}
			{visible && (
				<div className='flex max-w-[80vw] flex-wrap gap-3'>
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
					{currentVersions.length > 1 && (
						<ModalButton
							handleOpen={() => handleOpen(3)}
							content={"Versions"}
							isDropdown
						/>
					)}
					{/**versions button*/}
					<ModalButton
						handleOpen={() => handleOpen(4)}
						content={<MdSettings className='fill-zinc-300 text-3xl' />}
					/>
				</div>
			)}

			{open && (
				<ModalWrapper currentAnim={currentAnim} handleClose={handleClose}>
					{getViewContent(activeView)}
				</ModalWrapper>
			)}
		</div>
	);
};

export default ModalNav;
