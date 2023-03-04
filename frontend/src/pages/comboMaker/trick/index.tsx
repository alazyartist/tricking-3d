import React from 'react';

interface TrickProp {
  name: string;
  type: string;
  id: number;
  trick_id: string;
  start_position?: Array<string>;
  end_position: Array<string>;
  variations?: Array<string>;
}
const Trick: { (trick: TrickProp): JSX.Element; } = (trick) => {

  return (
    <div className="w-[40vw] flex-col-center bg-zinc-600 border-2 border-white p-2 rounded-lg">
    <p className="bg-zinc-800 w-full text-zinc-600 flex-center">Type: {trick.type}</p>
    <p className="bg-zinc-800 w-full text-zinc-600 flex-center">Name: {trick.name}</p>
      {trick.start_position &&
        trick.start_position.map((transition, key) => (
          <p key={key} className="bg-zinc-500 w-full text-zinc-900 flex-center">{transition}</p>
        ))
      }
      {trick.end_position &&
        trick.end_position.map((transition, key) => (
          <p key={key} className="bg-zinc-600 w-full text-zinc-800 flex-center">{transition}</p>
        ))
      }
      {/*
        */}
      {trick.variations &&
        trick.variations.map((variation, key) => (
          <p key={key} className="bg-blue-700 w-full text-black flex-center">{variation}</p>
        ))
      }
    </div>
  )
}

export default Trick;
