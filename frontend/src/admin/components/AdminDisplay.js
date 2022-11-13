import React, { useState, lazy, Suspense } from "react";
import { IoIosList, IoIosPeople } from "react-icons/io";
const DataList = lazy(() => import("./DataList"));
const SessionSummariesOverview = lazy(() =>
	import("./SessionSummariesOverview")
);
const TrickPointEditor = lazy(() => import("./trickMaker/TrickPointEditor"));
const UserList = lazy(() => import("./UserList"));
const AdminDisplay = () => {
	const [displayItem, setItem] = useState();
	return (
		<>
			<div className='absolute top-[30vh] left-0 z-[100] flex flex-col  gap-2 rounded-md rounded-l-none bg-zinc-900 p-2 text-2xl md:text-4xl'>
				<IoIosList onClick={() => setItem("Tricks")} />
				<IoIosPeople onClick={() => setItem("Users")} />
				<span
					onClick={() => setItem("SessionSummaries")}
					className={"text-center font-titan text-xl md:text-2xl"}>
					S
				</span>
				<span
					onClick={() => setItem("TrickPoints")}
					className={"text-center font-titan text-xl md:text-2xl"}>
					TP
				</span>
			</div>
			<div>
				{displayItem === "Tricks" && (
					<Suspense fallback={<div>Loading...</div>}>
						{" "}
						<DataList />
					</Suspense>
				)}
				{displayItem === "Users" && (
					<Suspense fallback={<div>Loading...</div>}>
						<UserList />
					</Suspense>
				)}
				{displayItem === "SessionSummaries" && (
					<Suspense fallback={<div>Loading...</div>}>
						<SessionSummariesOverview />
					</Suspense>
				)}
				{displayItem === "TrickPoints" && (
					<Suspense fallback={<div>Loading...</div>}>
						<TrickPointEditor />
					</Suspense>
				)}
			</div>
		</>
	);
};

export default AdminDisplay;
