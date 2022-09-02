import React, { useState } from "react";
import TricklistPage from "../../tricklist/TricklistPage";

const TricklistsAndClamiedContainer = ({
	MyTricklists,
	Claimed,
	profileuuid,
}) => {
	const [activePane, setActivePane] = useState("Tricklists");
	return (
		<>
			<div className='place-content-center place-items-center flex w-[80vw] gap-2'>
				<div
					onClick={(e) => setActivePane("Tricklists")}
					className={`flex w-full select-none justify-between rounded-t-md p-2 ${
						activePane === "Claimed" ? "bg-zinc-700" : "bg-zinc-600"
					}`}>
					<div>Tricklists</div>
					<div>{MyTricklists?.length}</div>
				</div>
				<div
					onClick={(e) => setActivePane("Claimed")}
					className={`w-full select-none rounded-t-md p-2 ${
						activePane === "Tricklists" ? "bg-zinc-700" : "bg-zinc-600"
					}`}>
					Claimed
				</div>
			</div>
			{activePane === "Tricklists" && (
				<div
					className={`place-items-center flex h-[37vh] w-[80vw] flex-col ${
						MyTricklists?.length
							? "place-content-start"
							: "place-content-center"
					} bg-zinc-600`}>
					{/* {(MyTricklists?.length &&
						MyTricklists?.map((list) => (
							<div onClick={() => console.log(list)}>{list?.name}</div>
						))) ||
						"No Tricklists to Display"} */}
					{MyTricklists?.length ? (
						<TricklistPage profileuuid={profileuuid} displayOnly />
					) : (
						"No Tricklists to Display"
					)}
				</div>
			)}
			{activePane === "Claimed" && (
				<div
					className={`place-content-center place-items-center flex h-[37vh] w-[80vw] flex-col bg-zinc-600`}>
					{(Claimed?.length &&
						MyTricklists?.map((list) => <div>{list?.name}</div>)) ||
						"No ClaimedTricks to Display"}
				</div>
			)}
		</>
	);
};

export default TricklistsAndClamiedContainer;
