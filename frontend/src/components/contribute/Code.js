import React from "react";

function Code() {
	return (
		<div>
			<div className='p-4 font-inter text-base font-light text-zinc-300'>
				<div className='text-2xl font-bold'>Know Programming?</div>
				Want to contribute to the project? Our repo is open source and available
				at github.com/alazyartist/tricking-3d.
				<br />
				<br />
				<hr className='p-2' />
				If you’d like to make a contribution just follow the Readme’s and make a
				pull request. Someone will review your code. If you’d like to join the
				core team. You can reach out via email to dylan@torquetricking.com or on
				Instagram via @alazyartist or @torquetricking
			</div>
			<div className='p-4'>
				<div className='text-2xl font-bold'>Technologies Used</div>
				<ul className='pl-2 text-sm font-bold'>
					Javascript
					<ul className='flex flex-col pl-3'>
						Frontend
						<li className='pl-3 font-normal'>React</li>
						<li className='pl-3 font-normal'>React-Router</li>
						<li className='pl-3 font-normal'>React-Three-Fiber</li>
						<li className='pl-3 font-normal'>Three-JS</li>
						<li className='pl-3 font-normal'>
							Tensorflow-JS(not yet implemented)
						</li>
					</ul>
					<ul className='flex flex-col pl-3'>
						Backend
						<li className='pl-3 font-normal'>Node</li>
						<li className='pl-3 font-normal'>Express</li>
						<li className='pl-3 font-normal'>MySQL</li>
						<li className='pl-3 font-normal'>Sequelize</li>
					</ul>
				</ul>
			</div>
		</div>
	);
}

export default Code;
