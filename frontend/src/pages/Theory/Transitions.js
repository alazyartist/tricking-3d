import React from "react";
import { Link, Outlet } from "react-router-dom";
import { transArr, transitions } from "../../data/TricklistClass";
function Transitions() {
	console.table(transArr);
	return (
		<>
			<div className='font-inter mt-4 flex flex-col place-content-center place-items-center font-bold text-zinc-300'>
				<div className='text-xl font-black text-white'>Transitions</div>
				<Link to='all'>All</Link>
				<Link to='singular'>Singular</Link>
				<Link to='sequential'>Sequential</Link>
				<Link to='unified'>Unified</Link>
				<div className='h-fit w-full rounded-md bg-zinc-500'>
					<div>Transitions Array</div>
					{transArr.map((e) => {
						return (
							<div className='flex gap-3'>
								{Object.keys(e).map((key, i) => (
									<table className='bg-zinc-400' id={i}>
										<tr>
											<td>{`${key}:`}</td>
										</tr>
										<tr className='pr-4'>
											<td>{e[key]}</td>
										</tr>
									</table>
								))}
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
