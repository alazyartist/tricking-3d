import React from "react";
import { FaGraduationCap } from "react-icons/fa";
import { useRouter } from "next/router";
import AnatomyNav from "./components/AnatomyNavSVG";
import AnatomySketch from "./components/AnatomySketchSVG";
import TheoryIndexInstructions from "./TheoryIndexInstructions";
import WhatIsTricking from "./WhatIsTricking";
function TheoryPage() {
  const nav = useRouter();

  return (
    <>
      {/* <div className='sticky top-0 h-14 bg-zinc-900'></div> */}
      <div className="no-scrollbar  flex h-screen flex-col place-content-start place-items-center overflow-y-scroll p-4 pb-8 font-inter font-bold text-zinc-800">
        {/* <Link
					to='/3d/theory'
					className='font-inter px-4 text-center text-3xl font-bold text-zinc-300'>
					Theory
				</Link>
				<div className='text-zinc-300'>Theory !=== Reality</div> */}
        <div
          onClick={() => nav.push("/theory")}
          className="absolute left-5 top-4 text-3xl text-zinc-300 "
        >
          <FaGraduationCap />
        </div>
        <div className="flex flex-col place-items-center gap-4 rounded-xl bg-zinc-900 bg-opacity-70 p-4 lg:w-[60vw]">
          {/* <AnatomySVG className=' h-full w-[80vw] text-zinc-300' /> */}
          {nav.pathname === "/theory" && (
            <AnatomySketch className="h-full w-[80vw] max-w-[540px]  p-4 text-zinc-300" />
          )}
          <AnatomyNav className=" h-full w-[80vw] max-w-[540px] text-zinc-300" />
          <TheoryIndexInstructions />
          <WhatIsTricking />
        </div>
      </div>
    </>
  );
}

export default TheoryPage;
