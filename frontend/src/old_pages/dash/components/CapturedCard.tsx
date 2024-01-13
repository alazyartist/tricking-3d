import React, { useState } from "react";
import * as d3 from "d3";
import Image from "next/image";
/* Tricker Profile Icons - rendered in Catpures Page */
const CapturedCard = ({ name, src, username, userid }) => {
  const [displayName, setDisplayName] = useState(false);

  return (
    <div
      className="
			flex w-full 
			place-items-center
			gap-2 rounded-lg
			bg-zinc-800 bg-opacity-40 p-2
			pt-3
      font-inter lg:min-w-[250px]  lg:place-content-start
			lg:gap-4 
      lg:pl-4
		"
    >
      {/* Profile Icon */}
      <div
        style={{
          backgroundColor: d3.interpolateRainbow((userid % 15) / 15),
        }}
        className={`relative h-12 w-12 rounded-full lg:h-20 lg:w-20`}
      >
        <Image
          width={100}
          height={100}
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
