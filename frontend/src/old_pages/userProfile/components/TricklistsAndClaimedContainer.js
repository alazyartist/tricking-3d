import React, { useState } from "react";
import TricklistPage from "../../tricklist/TricklistPage";
import ClaimedDisplay from "./ClaimedDisplay";
const TricklistsAndClamiedContainer = ({
	MyTricklists,
	ClaimedCombos,
	ClaimedTricks,
	profileuuid,
	isUsersPage,
}) => {
	const [activePane, setActivePane] = useState("Tricklists");

	return (
		<>
			<div className='flex h-full w-[80vw] max-w-[800px] place-content-center place-items-center gap-2'>
				<div
					onClick={(e) => setActivePane("Tricklists")}
					className={`flex w-full select-none justify-between rounded-t-md p-2 ${
						activePane === "Tricklists" ? "bg-zinc-600" : "bg-zinc-800"
					}`}>
					<div>Tricklists</div>
					<div>{MyTricklists?.length}</div>
				</div>
				<div
					onClick={(e) => setActivePane("Claimed")}
					className={`flex w-full select-none justify-between rounded-t-xl p-2 ${
						activePane === "Claimed" ? "bg-zinc-600" : "bg-zinc-800"
					}`}>
					<div>Claimed</div>
					<div>{ClaimedCombos?.length + ClaimedTricks?.length || 0}</div>
				</div>
			</div>
			{activePane === "Tricklists" && (
				<div
					className={`flex h-[40vh] w-[80vw] max-w-[800px] flex-col place-items-center rounded-b-xl py-4 ${
						MyTricklists?.length
							? "place-content-start"
							: "place-content-center"
					} bg-zinc-600`}>
					{MyTricklists?.length ? (
						<>
							<TricklistPage profileuuid={profileuuid} displayOnly />
						</>
					) : (
						"No Tricklists to Display"
					)}
				</div>
			)}
			{activePane === "Claimed" && (
				<div
					className={`flex h-[37vh] w-[80vw] max-w-[800px] flex-col place-content-start place-items-center bg-zinc-600`}>
					<ClaimedDisplay Claimed={[...ClaimedCombos, ...ClaimedTricks]} />
				</div>
			)}
		</>
	);
};

export default TricklistsAndClamiedContainer;
