import React from 'react';

interface TrickProp {
  startingStance: String;
  landingStance: String;
  type: String;
  name: String;
  id: String;
  variations?: Array<String>;
}
const Trick: React.FC = (trick) => {

  return (
    <div className="w-[40vw] flex-col-center bg-red-600 border-2 border-white p-2">
    <p className="bg-zinc-800 w-full text-zinc-600 flex-center">{trick.type}</p>
      <p className="bg-zinc-800 w-full text-zinc-600 flex-center">{trick.name}</p>
      <p className="bg-zinc-500 w-full text-zinc-900 flex-center">{trick.startingStance}</p>
      <p className="bg-zinc-600 w-full text-zinc-800 flex-center">{trick.landingStance}</p>
      <p className="bg-zinc-700 w-full text-black flex-center">{trick.variations}</p>
      <p className="bg-zinc-900 w-full text-zinc-500 flex-center">{trick.id}</p>
    </div>
  )
}

export default Trick;
