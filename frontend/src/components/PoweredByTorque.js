import React from "react";
import { ReactComponent as HorizontalLogo } from "../data/HorizontalLogo.svg";
function PoweredByTorque() {
	return (
		<a
			id='logo-container'
			className='basis-[1/6] text-gray-500'
			href='https://torquetricking.com'
			target='_blank'
			rel='noopener noreferrer'>
			<div className='item-end justify-center rounded-xl bg-gray-800 p-2'>
				Powered By
				<HorizontalLogo
					id='torque-logo'
					fill='dimgray'
					className='items-center justify-center rounded-xl p-2'
				/>{" "}
			</div>
		</a>
	);
}

export default PoweredByTorque;
