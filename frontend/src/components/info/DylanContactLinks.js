import React from "react";
import { BsInstagram } from "react-icons/bs";
import { SiMinutemailer } from "react-icons/si";
function DylanContactLinks() {
	return (
		<div id='contact-link-container' className='mt-3 flex flex-col'>
			<a className='inline' href='mailto:dylan@torquetricking.com'>
				<SiMinutemailer className='mx-2 inline' />
				dylan@torquetricking.com
			</a>
			<a
				className='inline'
				rel='noopener noreferrer'
				target={"_blank"}
				href='https://instagram.com/alazyartist'>
				<BsInstagram className='mx-2 inline' />
				@alazyartist{" "}
			</a>
			<div className='relative left-32 top-[-1rem] flex w-fit flex-col text-[.5rem] leading-[.5rem]'>
				<div>PREFFERED</div>
				<div>METHOD</div>
			</div>
			<a
				className='mt-[-1rem] inline'
				rel='noopener noreferrer'
				target={"_blank"}
				href='https://instagram.com/torquetricking'>
				<BsInstagram className='mx-2 inline' />
				@torquetricking
			</a>
		</div>
	);
}

export default DylanContactLinks;
