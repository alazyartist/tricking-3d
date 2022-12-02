import React from "react";
import BluesBackground from "../../scenes/backgrounds/1st_scene";
import { JapanShrine } from "../../scenes/backgrounds/Japanshrine";
import SceneBackground from "../../scenes/SceneBackground";
import { useStore } from "../../store/store";
export default function LoadActiveBackground(props) {
	const activeBackground = useStore((state) => state.activeBackground);
	// console.log("ModelSelector", activeModel);
	if (activeBackground === "Torque") {
		return <SceneBackground />;
	} else if (activeBackground === "BluesBackground") {
		return <BluesBackground />;
	} else if (activeBackground === "JapanShrine") {
		return <JapanShrine />;
	} else if (activeBackground === "The Void") {
		return (
			<gridHelper args={[10, 10, `black`, `gainsboro`]} position={[0, 0, 0]} />
		);
	} else return;
}
