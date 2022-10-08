import React, { useEffect, useState } from "react";
import { useVideoStore } from "./useVideoStore";
import { useUserStore } from "../../../store/userStore";
import VideoControls from "./VideoControls";
const VideoInput = () => {
	const [file, setFile] = useState();
	const { uuid } = useUserStore((s) => s.userInfo);
	const [filename, setFilename] = useState("Select Video");
	const vidSrc = useVideoStore((s) => s.videoSource);
	const setVidSrc = useVideoStore((s) => s.setVideoSource);
	const onSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("file", file);
		formData.append("uuid", uuid);
	};
	const clearSrc = () => {
		setVidSrc("");
		setFilename("Select Video");
	};
	const onChange = (e) => {
		console.log(e);
		setFile(e.target.files[0]);
		setFilename(e.target.files[0].name);
	};
	useEffect(() => {
		if (file) {
			const url = URL.createObjectURL(file);
			console.log(url);
			console.log(file);
			setVidSrc(url);
		}
	}, [file]);

	return (
		<div className='absolute bottom-[18vh] flex w-full flex-col'>
			{/* {file && (
				<video
					src={vidSrc}
					controls={false}
					muted
					loop
					playsInline
					autoPlay
					className={`absolute top-0 left-0 h-full w-full `}
				/>
			)} */}
			<form
				id='form'
				className='] z-[4] flex w-full gap-2 p-2'
				onSubmit={onSubmit}>
				<label
					className='mb-2 flex w-3/4 place-content-center place-items-center rounded-xl bg-zinc-800 p-2 text-sm text-zinc-300'
					placeholder='Select Video'
					htmlFor='profilePic'>
					{filename}
					<input
						onChange={onChange}
						id={"profilePic"}
						className='hidden'
						type={"file"}
						accept='video/*'
					/>
				</label>

				<button
					className='mb-2 flex w-1/4 place-content-center place-items-center rounded-xl bg-zinc-800 p-2 text-sm text-zinc-300'
					onClick={() => clearSrc()}
					type='button'>
					Clear Video
				</button>
				{/* <label
					className='mb-2 flex w-1/4 place-content-center place-items-center rounded-xl bg-zinc-800 p-2 text-sm text-zinc-300'
					htmlFor='upload'>
					Upload
					<input id='upload' className='hidden' type={"submit"} />
				</label> */}
			</form>
		</div>
	);
};

export default VideoInput;
