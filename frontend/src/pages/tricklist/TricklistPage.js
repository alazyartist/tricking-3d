import React from "react";
import MakeNewTrickList from "./components/MakeNewTrickList";
import TricklistDisplay from "./components/tricklistDisplay";

const TricklistPage = () => {
	return (
		<div className='flex flex-col place-content-center place-items-center'>
			<div>TricklistPage</div>
			<TricklistDisplay />
			<MakeNewTrickList />
		</div>
	);
};

export default TricklistPage;
