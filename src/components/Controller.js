import React from "react";
import { useStore } from "../store/store.js";
import { FaPlay, FaPause } from "react-icons/fa";
import { MediaButton } from "../components/Button.js";

function Controller() {
	const setIsPaused = useStore((state) => state.setIsPaused);
	const setIsPlaying = useStore((state) => state.setIsPaused);
	const setBounce = useStore((state) => state.setBounce);
	const isPaused = useStore((state) => state.isPaused);
	const bounce = useStore((state) => state.bounce);
	const setTimescale = useStore((state) => state.setTimescale);
	const timescale = useStore((state) => state.timescale);

  // Envoke Player Controller

	return (
    <div 
      id='controller-container'
      className='z-[-5] grid grid-cols-3 justify-around justify-items-stretch gap-5 text-base'>

      <MediaButton
        id='play-pause-button'
        f={setIsPaused}
        content={
          !isPaused ? (
            <FaPause className='fill-yellow-200 p-0' />
          ) : (
            <FaPlay className='flex items-center  justify-around fill-green-600' />
          )
        }
      />
      <MediaButton 
        id='bounce-button' 
        f={setBounce} 
        content={bounce ? "Bounce" : "Loop"} 
      />
      <MediaButton 
        id='extra-play-pause-button TBR' 
        f={setIsPlaying} 
        content={isPaused ? "Paused" : "Playing"} 
      />
      <MediaButton
        id='reverse-button' 
        f={() => setTimescale(-timescale)}
        content={timescale < 0 ? "esreveR" : "Reverse"}
      />
      <MediaButton
        id='reduce-speed-button'
        f={() => setTimescale(0.5 * timescale)}
        content={`SlowMo ${Math.abs(
          Number.parseFloat(timescale).toFixed(2)
        )}`}
      />
      <MediaButton 
        id='full-speed-button' 
        f={() => setTimescale(1)} 
        content='FullSpeed' 
      />

    </div>
  );
}

export default Controller;
