import React from 'react';

function LoadingOverlay({progress, setIsLoaderOpen}) {
  return (
    <div className="fixed h-[100%] w-[100%] z-[1001] flex flex-col justify-center items-center bg-gray-900 text-white pt-[15rem] pb-[7rem] overflow-scroll">
      {/**header card */}
      <div className="flex flex-col justify-center items-center gap-10 bg-slate-700
	  w-full shadow-lg shadow-gray-800 rounded-md py-10">
        <div>
          <p className="text-5xl font-medium">Tricking-3d</p>
        </div>
        <div>
          <p className="text-xl">
            An open source data visualisation tool for trickers and movement artists.
          </p>
        </div>
      </div>
      {/**body container */}
      <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row 
	  	justify-center items-center gap-y-10 md:space-x-10 w-full sm:w-full md:w-5/6 lg:w-3/4 xl:w-3/4 min-h-[100%]">

        {/**instructions container */}
        <div className="flex flex-col justify-center items-center gap-10 bg-slate-700
	  		w-10/12 sm:w-6/12 md:w-7/12 lg:w-6/12 xl:w-4/12 shadow-lg shadow-gray-800 
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
        {/**app loader container*/}
        <div className="flex flex-col justify-center items-center gap-10 bg-slate-700
	  	w-10/12 sm:w-6/12 md:w-7/12 lg:w-6/12 xl:w-4/12 shadow-lg shadow-gray-800 
          rounded-md p-10 h-[30rem]">
          <div>
            <p className="text-4xl font-medium">{progress}%</p>
          </div>
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
    </div>
  );
}

export default LoadingOverlay;
