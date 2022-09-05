import { Canvas } from "@react-three/fiber";
import React from "react";
import { TorqueScene } from "../../../scenes/TorqueScene";
import { TrickListScene } from "../../../scenes/TrickListScene";

const UserAvatarDisplay = () => {
	return (
		<div className='place-content-center place-items-center flex h-[35vh] flex-col'>
			<Canvas className='h-[400px] w-fit min-w-[28vw] max-w-[48vw] rounded-xl bg-zinc-700'>
				<TorqueScene />
				{/* <TrickListScene /> */}
			</Canvas>
			<div>Social Links</div>
		</div>
	);
};

export default UserAvatarDisplay;
