import React, {Fragment} from 'react';

function LoadingOverlay({progress, setIsLoaderOpen}) {
  return (
    <div className="fixed h-[100%] w-[100%] z-[1001] flex flex-col justify-start items-center bg-gray-900 text-white pb-[7rem] overflow-scroll">
      {/**top left header thing */}
      <div className="flex flex-col justify-start content-start
	      w-full py-5 px-5">
        <div>
          <p className="text-2xl font-extrabold font-inter">Tricking 3D</p>
        </div>
        <div />
      </div>

      {/**instr container */}
      {/**instructions container */}
      <div className="flex flex-col justify-center items-center gap-10
	  		w-10/12 sm:w-6/12 md:w-7/12 lg:w-6/12 xl:w-4/12
              rounded-md p-10 h-[30rem]">

        <div>
          <p className="text-5xl font-medium">Instructions</p>
        </div>
        <ol className="list-disc flex flex-col space-y-2">
          <li>
            <p className="text-xl">
              Use ☝️ to look around with camera.
            </p>
          </li>
          <li>
            <p className="text-xl">
              Use ✌️ to reposition camera.
            </p>
          </li>
          <li>
            <p className="text-xl">
              Select the animations from the dropdown to choose a new animation.
            </p>
          </li>
          <li>
            <p className="text-xl">
              SlowMo slows speed by 0.5.
            </p>
          </li>
          <li>
            <p className="text-xl">
              Full speed resets speed to 1.
            </p>
          </li>
          <li>
            <p className="text-xl">
              Reverse flips clip play direction - useful for isolating areas of a trick.
            </p>
          </li>
        </ol>

      </div>

      {/**loader container */}
      <div className="flex flex-col justify-center items-center gap-10 
	  	w-10/12 sm:w-6/12 md:w-7/12 lg:w-6/12 xl:w-4/12
          rounded-md p-10 h-[30rem]">
        {progress !== 100 &&
          <div>
            <p className="text-4xl font-medium">{Math.trunc (progress)}%</p>
          </div>}
        {progress === 100 &&
          <div>
            <button
              className="h-12 px-6 m-2 text-lg text-indigo-100 transition-colors duration-500 
            bg-indigo-600 rounded-lg focus:shadow-outline hover:bg-indigo-700"
              onClick={() => setIsLoaderOpen (false)}
            >
              <p className="text-large font-bold">Start</p>
            </button>
          </div>}
      </div>

    </div>
  );
}

export default LoadingOverlay;
