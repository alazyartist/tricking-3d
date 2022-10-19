import React, { useState } from "react";
import SessionSetup from "./SessionSetup";

const HostSession = ({ hostuuid }) => {
	const [setupVisible, setSetupVisible] = useState(false);
	return setupVisible ? (
		<div className=' absolute top-[5vh] left-[10vw] z-[1005] flex h-[90vh] w-[80vw] flex-col place-items-center bg-zinc-800'>
			<SessionSetup setSetupVisible={setSetupVisible} />
		</div>
	) : (
		<div onClick={() => setSetupVisible(true)}>HostSession</div>
	);
};

export default HostSession;
