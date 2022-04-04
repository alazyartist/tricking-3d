import React from "react";
import DylanContactLinks from "../info/DylanContactLinks";

function Design() {
	return (
		<div>
			<div className='p-4 pt-0 font-inter text-sm font-light text-zinc-300'>
				<div className='text-2xl font-bold'>Are you a designer?</div>
				Think you can help us make things look better than they do? <br />
				We currently need help with:
				<div className='flex flex-col place-content-center'>
					<ul>
						<li>Icons</li>
						<li>WebLayout</li>
						<li>Marketing Materials</li>
					</ul>
				</div>
				<br />
				We’d love have your help! Just reach out to Dylan James.
				<DylanContactLinks />
			</div>
		</div>
	);
}

export default Design;
