import React from "react";
import { MediaButton } from "../media/MediaButton";
import { useStore } from "../../store/store";
import { MdInfo, MdInfoOutline } from "react-icons/md";
function InfoButton() {
	const showInfo = useStore((s) => s.showInfo);
	const setInfo = useStore((s) => s.setInfo);

	return (
		<div id='info-container' className='mt-[.5vh]'>
			<MediaButton
				id='Minimal UI'
				content={
					showInfo ? (
						<MdInfo className='fill-zinc-300 text-3xl' />
					) : (
						<MdInfoOutline className='fill-zinc-300 text-3xl' />
					)
				}
				f={setInfo}
			/>
		</div>
	);
}

export default InfoButton;
