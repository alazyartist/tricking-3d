import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import TorqueScene from "../../../scenes/TorqueScene";
import { TrickListScene } from "../../../scenes/TrickListScene";

const UserAvatarDisplay = () => {
	return (
		<div className='flex h-[35vh] flex-col place-content-center place-items-center'>
			<Suspense fallback={<div>...Loading</div>}>
				<Canvas className='h-[400px] w-fit min-w-[28vw] max-w-[48vw] rounded-xl bg-zinc-700'>
					<TorqueScene />
					{/* <TrickListScene /> */}
				</Canvas>
			</Suspense>
			<div>Social Links</div>
		</div>
	);
};

export default UserAvatarDisplay;
