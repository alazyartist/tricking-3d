import React from 'react';

interface TrickProp {
  startingStance: String;
  landingStance: String;
  type: String;
  name: String;
  id: String;
  variations?: Array<String>;
}
const Trick: { (trick: TrickProp): JSX.Element; } = (trick) => {

  return (
    <div className="w-[40vw] flex-col-center bg-zinc-600 border-2 border-white p-2 rounded-lg">
      <p className="bg-zinc-800 w-full text-zinc-600 flex-center">{trick.type}</p>
      <p className="bg-zinc-800 w-full text-zinc-600 flex-center">{trick.name}</p>
      <p className="bg-zinc-500 w-full text-zinc-900 flex-center">{trick.startingStance}</p>
      <p className="bg-zinc-600 w-full text-zinc-800 flex-center">{trick.landingStance}</p>
      {trick.variations &&
        trick.variations.map((variation) => (
          <p className="bg-blue-700 w-full text-black flex-center">{variation}</p>
        ))
      }
      {/*
      <p className="bg-zinc-900 w-full text-zinc-500 flex-center">{trick.id}</p>
      */}
    </div>
  )
}

export default Trick;
