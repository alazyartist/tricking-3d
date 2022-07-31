import { useFrame } from "@react-three/fiber";
import React, { useEffect, useMemo } from "react";
import { useStore } from "../store/store";
import * as THREE from "three";
function useMediaController(actions, names, mixer) {
	//Use Store
	const bounce = useStore((s) => s.bounce);
	const currentAnim = useStore((s) => s.currentAnim);
	const end = useStore((s) => s.end);
	const isPaused = useStore((s) => s.isPaused);
	const isPlaying = useStore((s) => s.isPlaying);
	const isScrubbing = useStore((s) => s.isScrubbing);
	const loop = useStore((s) => s.loop);
	const setAnimationsArray = useStore((s) => s.updateAnimationArray);
	const setClipDuration = useStore((s) => s.setClipDuration);
	const setCurrentTime = useStore((s) => s.setCurrentTime);
	const start = useStore((s) => s.start);
	const timescale = useStore((s) => s.timescale);
	const trimToggle = useStore((s) => s.trimToggle);
	const activeModel = useStore((s) => s.activeModel);
	const isFollowCam = useStore((s) => s.isFollowCam);
	const frameTime = useStore((s) => s.currentTime);
	//Solves Problem with infinte renders of Animations Array and successfully passes to store
	useMemo(
		() =>
			Promise.resolve(names).then((results) => {
				console.log(results);
				setAnimationsArray(results);
			}),
		[names, setAnimationsArray]
	);
	// Handle Animation Loop
	//bounce uE
	useEffect(() => {
		bounce
			? actions[currentAnim]?.setLoop(THREE.LoopPingPong)
			: actions[currentAnim]?.setLoop(THREE.LoopRepeat);
	}, [bounce, actions, currentAnim]);

	//loop uE
	useEffect(() => {
		loop
			? actions[currentAnim]?.setLoop(THREE.LoopRepeat)
			: actions[currentAnim]?.setLoop(THREE.LoopOnce);
	}, [loop, actions, currentAnim]);

	//Timescale (SlowMo, FullSpeed, Timeslider) && Play Pause uE
	useEffect(() => {
		isPaused
			? (actions[currentAnim].timeScale = 0)
			: (actions[currentAnim].timeScale = timescale);
	}, [timescale, isPaused, actions, currentAnim]);

	// Set Play Start uE
	useEffect(() => {
		isPlaying ? actions[currentAnim]?.play() : actions[currentAnim]?.play();
	}, [isPlaying, actions, currentAnim]);

	// Scrub
	useEffect(() => {
		if (isScrubbing > 0) {
			const duration = actions[currentAnim]?.getClip().duration.toFixed(2);
			actions[currentAnim].time =
				isScrubbing === 1 ? duration * start : duration * end;
		}
	}, [isScrubbing, start, end, actions, currentAnim]);

	// Apply Clip Duration

	//Switched from useFrame to useEffect Seems to be same functionality.
	useEffect(() => {
		if (!trimToggle && !isScrubbing) {
			const duration = parseFloat(
				actions[currentAnim].getClip().duration.toFixed(2)
			);
			let startHere = parseFloat((start * duration).toFixed(2));
			let endHere = parseFloat((end * duration).toFixed(2));
			let current = parseFloat(actions[currentAnim].time);

			if (current.toFixed(1) >= endHere.toFixed(1)) {
				actions[currentAnim].time = startHere;
			}
		}
	}, [trimToggle, isScrubbing, start, end]);
	//Updates every Frame to paint currentTime
	useEffect(() => {
		actions[currentAnim].time = frameTime;
	}, [frameTime]);

	useFrame(() => {
		if (isPlaying) {
			setCurrentTime(actions[currentAnim].time);
			setClipDuration(actions[currentAnim].getClip().duration);
		}
	});

	//Resets Animations Player on Change of CurrentAnim
	useEffect(() => {
		mixer.stopAllAction();
		actions[currentAnim].play();
	}, [currentAnim, activeModel]);

	return;
}

export default useMediaController;
