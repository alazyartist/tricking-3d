import React from "react";
import { Link, Outlet } from "react-router-dom";
import AppBackground from "../components/layout/AppBackground";
import Header from "../components/layout/Header";

export function TestPage() {
	return (
		<>
			<Header />
			<AppBackground>
				<div
					id='container'
					className=' m-10 flex h-[80vh] w-[80vw] flex-col gap-4 rounded-xl md:grid md:grid-flow-row'>
					<Link
						to='/3d/home'
						className='rounded-xl bg-gradient-to-b from-teal-500 to-teal-400'>
						Home
					</Link>
					<Link
						to='/3d/sandbox'
						className='rounded-xl bg-gradient-to-b from-sky-600 to-sky-500'>
						SandboxLink
					</Link>
					<Link
						to='/3d/contribute'
						className='rounded-xl bg-gradient-to-b from-amber-400 to-yellow-300'>
						Contribute
					</Link>

					<div className='col-span-3 row-start-2 grid grid-cols-3  place-items-center gap-4 rounded-xl bg-gradient-to-b from-indigo-500 to-sky-400 p-4 '>
						<div className='m-2 flex h-full w-2/3 flex-col place-content-start  gap-4 rounded-xl '>
							<Link
								className='rounded-xl bg-emerald-400 from-emerald-400 to-emerald-200 p-2 text-center hover:bg-gradient-to-r'
								to='testoutlet'>
								testoutlet
							</Link>
							<Link
								className='rounded-xl bg-emerald-400 from-emerald-400 to-emerald-200 p-2 text-center hover:bg-gradient-to-r'
								to='testoutlet2'>
								testoutlet2
							</Link>
							<Link
								className='rounded-xl bg-emerald-400 from-emerald-400 to-emerald-200 p-2 text-center hover:bg-gradient-to-r'
								to='testoutlet3'>
								testoutlet3
							</Link>
						</div>
						<div className='col-span-2 col-start-2 h-full w-full'>
							<Outlet />
						</div>
					</div>
				</div>
			</AppBackground>
		</>
	);
}
