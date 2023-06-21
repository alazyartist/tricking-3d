import React, { useState } from "react";
import * as d3 from "d3";
/* Tricker Profile Icons - rendered in Catpures Page */
const CapturedCard = ({ name, src, username, userid }) => {
  const [displayName, setDisplayName] = useState(false);

  return (
    <div
      className="
			flex w-[120px] flex-col 
			place-items-center
			gap-2 rounded-lg
			bg-zinc-900 bg-opacity-60 p-2
			pt-3
			font-inter 
		"
    >
      {/* Profile Icon */}
      <div
        style={{
          backgroundColor: d3.interpolateRainbow((userid % 15) / 15),
        }}
        className={`relative h-12 w-12 rounded-full lg:h-20 lg:w-20`}
      >
        <img
          src={src}
          alt={"profilePic"}
          className={`aspect-square h-12 w-12 rounded-full lg:h-20 lg:w-20 ${
            src.includes("noimg.jpeg") ? " mix-blend-multiply contrast-150" : ""
          }`}
        />
      </div>
      {/* <img src={src} className=' h-12 w-12 rounded-full lg:h-20 lg:w-20' /> */}

      {/* Display Name */}
      <div className=" flex px-2 align-middle text-xs tracking-wider text-zinc-300">
        {displayName ? name : username}
      </div>
    </div>
  );
};

export default CapturedCard;
