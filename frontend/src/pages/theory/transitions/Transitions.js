import React from "react";
import { Link, Outlet } from "react-router-dom";
import { transArr, transitions } from "../../../data/TricklistClass";
function Transitions() {
	console.table(transArr);
	return (
		<>
			<div className='mt-4 flex flex-col place-content-center place-items-center font-inter font-bold text-zinc-300'>
				<div className='text-xl font-black text-white'>Transitions</div>
				<div className='flex gap-2'>
					<Link to='all'>All</Link>
					<Link to='singular'>Singular</Link>
					<Link to='sequential'>Sequential</Link>
					<Link to='unified'>Unified</Link>
				</div>
				<div className='my-2 flex h-[27vh] w-full flex-col overflow-y-auto rounded-md '>
					<div>Transitions Array</div>
					{transArr.map((e) => {
						return (
							<div className=' my-2 flex flex-row gap-2 rounded-xl bg-zinc-500 bg-opacity-40 p-1'>
								<div className='text-2xl'>{e.name}</div>
								<div className='text-2xl'>{e.fromLeg}</div>
								<div className='text-2xl'>{e.toLeg}</div>

								{/* {Object.keys(e).map((key, i) => (
									<table className='bg-zinc-400' id={i}>
										<tr>
											<td>{`${key}:`}</td>
										</tr>
										<tr className='pr-4'>
											<td>{e[key]}</td>
										</tr>
									</table>
								))} */}
								{/* <div className='text-zinc-300'>{e?.name}</div>
								<div className='text-zinc-300'>From:{e?.fromLeg}</div> */}
							</div>
						);
					})}
				</div>
				<Outlet />
			</div>
		</>
	);
}

export default Transitions;
