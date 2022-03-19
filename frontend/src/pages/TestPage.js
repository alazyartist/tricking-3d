import React from "react";
import { Link, Routes, Route, Outlet } from "react-router-dom";
import AnimationsDropwdown from "../components/AnimationsDropwdown";

export function TestPage() {
	return (
		<div id=' container' className='flex justify-center'>
			<div className='mt-10 flex h-[80vh] w-[80vw] justify-center bg-red-500'>
				<div>TestPage</div>
				<Link to='/3d/sandbox'>SandboxLink</Link>
				<div className='flex flex-col bg-gray-500'>
					<Outlet />
				</div>
			</div>
		</div>
	);
}
