import React from "react";
import { useStore } from "../store/store.js";
import { FaPlay, FaPause } from "react-icons/fa";
import { Button } from "../components/Button.js";

function Controller() {
	const setIsPaused = useStore((state) => state.setIsPaused);
	const setBounce = useStore((state) => state.setBounce);
	const isPaused = useStore((state) => state.isPaused);
	const bounce = useStore((state) => state.bounce);
	return (
		<>
			<Button f={setIsPaused} content={!isPaused ? <FaPause /> : <FaPlay />} />
			<Button f={setBounce} content={bounce ? "true" : "false"} />
			<Button f={setIsPaused} content={!isPaused ? "Paused" : "Playing"} />
			<Button />
			<Button />
			<Button />
			<Button />
			<Button />
			<Button />
		</>
	);
}

export default Controller;
