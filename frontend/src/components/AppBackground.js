import React from "react";

function AppBackground(props) {
	return (
		<div
			id=' container'
			className='fixed h-screen w-screen place-content-center bg-gradient-to-b from-zinc-900 to-zinc-800'>
			{props.children}
		</div>
	);
}

export default AppBackground;
