import React, { useState } from "react";
import { IoIosVideocam } from "react-icons/io";
import { useStore } from "../../../store/store";
import VideoInput from "../videoOverlay/VideoInput";
const VideoOverlay = () => {
	const [videoInput, setVideoInput] = useState();
	const setBackground = useStore((s) => s.setBackground);
	const setFollowCam = useStore((s) => s.setFollowCam);
	const handleUpdate = () => {
		setVideoInput(!videoInput);
		setBackground("The Void");
		setFollowCam(false);
	};
	return (
		<>
			<div className='absolute bottom-40 right-2 z-[3]'>
				<IoIosVideocam
					onClick={() => handleUpdate()}
					className='text-xl text-zinc-300'
				/>
			</div>
			{videoInput && <VideoInput />}
		</>
	);
};

export default VideoOverlay;
