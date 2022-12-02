import { useRouter } from "next/router";
import * as React from "react";
import AxesSVG from "./AnatomyNavSVG/AxesSVG";
import GrabsSVG from "./AnatomyNavSVG/GrabsSVG";
import KicksSVG from "./AnatomyNavSVG/KicksSVG";
import RotationsSVG from "./AnatomyNavSVG/RotationsSVG";
import SetupSVG from "./AnatomyNavSVG/SetupSVG";
import ShapesSVG from "./AnatomyNavSVG/ShapesSVG";
import StancesSVG from "./AnatomyNavSVG/StancesSVG";
import TouchdownsSVG from "./AnatomyNavSVG/TouchdownsSVG";
import TransitionsSVG from "./AnatomyNavSVG/TransitionsSVG";
import TrickSVG from "./AnatomyNavSVG/TricksSVG";
import VariationsLinesSVG from "./AnatomyNavSVG/VariationsLinesSVG";

const AnatomyNav = (props) => {
  const nav = useRouter();

  const handleNav = (pathToNav) => {
    console.log(pathToNav);
    nav.push(pathToNav);
  };

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1026.8161367195285 352.68253968253964"
        width={1026.8161367195285}
        height={props.height}
        {...props}
      >
        <defs>
          <style>
            {
              '\r\n      @font-face {\r\n        font-family: "Virgil";\r\n        src: url("https://excalidraw.com/Virgil.woff2");\r\n      }\r\n      @font-face {\r\n        font-family: "Cascadia";\r\n        src: url("https://excalidraw.com/Cascadia.woff2");\r\n      }\r\n    '
            }
          </style>
        </defs>
        {/* <rect
					x={0}
					y={0}
					width={1026.8161367195285}
					height={352.68253968253964}
					fill='transparent'
					className='touch-none'
				/> */}
        <SetupSVG onClick={() => handleNav("setups")} />
        <TrickSVG onClick={() => handleNav("tricks")} />
        <StancesSVG onClick={() => handleNav("stances")} />
        <TransitionsSVG onClick={() => handleNav("transitions")} />
        <AxesSVG onClick={() => handleNav("axes")} />
        <TouchdownsSVG onClick={() => handleNav("touchdowns")} />
        <RotationsSVG onClick={() => handleNav("rotations")} />
        <KicksSVG onClick={() => handleNav("kicks")} />
        <GrabsSVG onClick={() => handleNav("grabs")} />
        <ShapesSVG onClick={() => handleNav("shapes")} />
        <VariationsLinesSVG />
      </svg>
    </>
  );
};

export default AnatomyNav;
