import React, { useEffect } from "react";
import Andrew from "../../animations/Andrew";
import { Frank } from "../../animations/Frank";
import Kerwood40 from "../../animations/Kerwood40";
import { KerwoodNew } from "../../animations/KerwoodNew";
import { SamCaspio } from "../../animations/SamCaspio";
import { useStore } from "../../store/store";
export default function LoadActiveModel(props) {
	const activeModel = useStore((state) => state.activeModel);
	// console.log("ModelSelector", activeModel);
	if (activeModel === "Frank") {
		return <Frank />;
	} else if (activeModel === "Kerwood") {
		return <KerwoodNew />;
	} else if (activeModel === "Andrew") {
		return <Andrew />;
	} else if (activeModel === "Sam Caspio") {
		return <SamCaspio />;
	} else return <h1>DIDNT FIND ANYTHING</h1>;
}
