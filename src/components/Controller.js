import React from 'react';
import {useStore} from '../store/store.js';
import {FaPlay, FaPause, FaStepBackward, FaStepForward} from 'react-icons/fa';
import {MediaButton} from '../components/Button.js';

function Controller () {
  const setIsPaused = useStore (state => state.setIsPaused);
  const setIsPlaying = useStore (state => state.setIsPaused);
  const setBounce = useStore (state => state.setBounce);
  const isPaused = useStore (state => state.isPaused);
  const bounce = useStore (state => state.bounce);
  const setTimescale = useStore (state => state.setTimescale);
  const timescale = useStore (state => state.timescale);

  // Envoke Player Controller

  return (
    <div
      id="controller-container"
      className="
        text-sm
        flex
        justify-around
      "
    >
      <MediaButton
        id="bounce-button"
        f={setBounce}
        content={bounce ? 'B' : 'L'}
      />
      <MediaButton
        id="reverse-button"
        f={() => setTimescale (-timescale)}
        content={timescale < 0 ? 'Fwd' : 'Rev'}
      />

      <MediaButton
        id="reverse-button"
        content={<FaStepBackward className="fill-slate-200 hover:fill-white" />}
      />

      <MediaButton
        id="play-pause-button"
        class="rounded"
        f={setIsPaused}
        content={
          !isPaused
            ? <FaPause className="fill-gray-800 p-0" />
            : <FaPlay className="flex items-center  justify-around fill-gray-800" />
        }
        isPlayPause
      />

      <MediaButton
        id="reverse-button"
        content={<FaStepForward className="fill-slate-200 hover:fill-white" />}
      />

      <MediaButton
        id="reduce-speed-button"
        f={() => setTimescale (0.5 * timescale)}
        content={`SlowMo ${Math.abs (Number.parseFloat (timescale).toFixed (2))}`}
      />
      <MediaButton
        id="full-speed-button"
        f={() => setTimescale (1)}
        content={'FullSpeed'}
      />

    </div>
  );
}

export default Controller;
