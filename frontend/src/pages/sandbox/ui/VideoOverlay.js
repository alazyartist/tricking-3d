import React, { useState } from "react";
import { IoIosVideocam } from "react-icons/io";
import VideoInput from "../videoOverlay/VideoInput";
const VideoOverlay = () => {
	const [videoInput, setVideoInput] = useState();
	return (
		<>
			<div className='absolute bottom-40 right-2 z-[3]'>
				<IoIosVideocam
					onClick={() => setVideoInput(!videoInput)}
					className='text-xl text-zinc-300'
				/>
			</div>
			{videoInput && <VideoInput />}
		</>
	);
};

export default VideoOverlay;
