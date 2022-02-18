import React from "react";

import { Html, useProgress } from "@react-three/drei";

function Loader() {
	const { progress } = useProgress();
	return (
		<Html className='text-mono text-3xl text-red-400' center>
			{Math.floor(progress)} % loaded
		</Html>
	);
}

export default Loader;
