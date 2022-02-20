import React, { useEffect } from "react";
import { useStore } from "../store/store";
function PlaybackSlider() {
  const setCurrentTime = useStore((state) => state.setCurrentTime);
  const setSlider    = useStore((state) => state.setSlider);
  const setTimescale = useStore((state) => state.setTimescale);
  let timeSlider = useStore((state) => state.timeSlider);
  let timescale  = useStore((state) => state.timescale);
  let clipDuration = useStore((state) => state.clipDuration);
  let currentTime  = useStore((state) => state.currentTime);

  useEffect(() => setTimescale(timeSlider), [timeSlider]);
  useEffect(() => {
    setSlider(timescale);
  }, [timescale]);

  return (
    <div className='relative rounded-lg py-4'>
      <button className='text-sm bg-red-900' >STOP</button>
      <div className='relative rounded-lg py-4'>
        <input
          className={"my-5 w-full bg-transparent"}
          type={"range"}
          min={0}
          max={clipDuration}
          step={0.1}
          value={currentTime}
          onChange={(e) => {console.log("slider..");}}
        />
      </div>
    </div>
  );
}

export default PlaybackSlider;
