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
  function content_row(key, _trick) {
    let info = _trick
    if (typeof (_trick) !== "string") info = _trick.join("-")
    return (
      <div className="">
        {trick.type && _trick[0] !== "_" && _trick[0][0] !== "_"
          ? <>
            <p className="trick-content"> {info} </p>
          </> : (null)
        }
      </div>
    )
  }

  return (
    <>
      {content_row("t", trick.type)}
      {content_row("n", trick.name)}
      {content_row("s", trick.start_position)}
      {content_row("e", trick.end_position)}
      {trick.variations &&
        trick.variations.map((variation, key) => (
          <p key={key} className="bg-blue-700 w-full text-black flex-center">{variation}</p>
        ))
      }
    </>
  )
}

{/* */ }
export default Trick;
