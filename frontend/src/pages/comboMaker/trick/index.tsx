import React from 'react';

interface TrickProp {
  name: string;
  type: string;
  id: number;
  trick_id: string;
  start_position?: Array<string>;
  end_position: Array<string>;
  breakdown?: Array<string>;
}

const Trick: { (trick: TrickProp): JSX.Element; } = (trick) => {
  const L = ["BacksideComplete","FrontsideMega","InsideMega","OutsideComplete"]
  const R = ["BacksideHyper","FrontsideSemi","InsideHyper","OutsideSemi"]
  const B = ["Backside","Frontside","Inside","Outside"]
  let start = ""
  /*
  if (L.includes(trick.start_position[trick.start_position.length-1][0]))
    start = "L"
  if (R.includes(trick.start_position[trick.start_position.length-1][0]))
    start = "R"
  if (B.includes(trick.start_position[trick.start_position.length-1][0]))
    start = "B"
  */

  let end = ""
  /*
  if (L.includes(trick.end_position[trick.end_position.length-1][0]))
    end = "L"
  if (R.includes(trick.end_position[trick.end_position.length-1][0]))
    end = "R"
  if (B.includes(trick.end_position[trick.end_position.length-1][0]))
    end = "B"
  */

  function content_row(_trick) {
    let info = _trick
    if (typeof (_trick) !== "string") info = _trick.join("-")
    return (
      <div className="">
        {trick.type && _trick[0] !== "_" && _trick[0][0] !== "_"
          ? <>
          {/*<p className="trick-content"> ({start}) {info} ({end})</p>*/}
            <p className="trick-content">{info}</p>
          </> : (null)
        }
      </div>
    )
  }

  return (
    <>
      {content_row(trick.type)}
      {content_row(trick.name)}
      {content_row(trick.start_position)}
      {content_row(trick.end_position)}
      {trick.breakdown &&
        trick.breakdown.map((variation, key) => (
          <p key={key} className="bg-blue-700 w-full text-black flex-center">{breakdown}</p>
        ))
      }
    </>
  )
}

{/* */ }
export default Trick;
