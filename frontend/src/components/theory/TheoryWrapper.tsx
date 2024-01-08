import { useRouter } from "next/router";
import React from "react";
import { FaGraduationCap } from "react-icons/fa";

import AnatomyNav from "@old_pages/theory/components/AnatomyNavSVG";
import AnatomySketch from "@old_pages/theory/components/AnatomySketchSVG";

const TheoryWrapper = ({ children }) => {
  const nav = useRouter();

  return (
    <>
      {/* <div className='sticky top-0 h-14 bg-zinc-900'></div> */}
      <div className="no-scrollbar  flex h-[100vh] flex-col place-content-start place-items-center overflow-y-scroll bg-zinc-900 bg-opacity-90 font-inter font-bold text-zinc-800">
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
        <div className="flex h-full flex-col place-items-center gap-4 p-4">
          {/* <AnatomySVG className=' h-full w-[80vw] text-zinc-300' /> */}
          {nav.pathname === "/theory" && (
            <AnatomySketch className="h-fit w-[80vw] max-w-[540px] text-zinc-300" />
          )}
          {!nav.pathname.includes("/transitions") &&
            !nav.pathname.includes("/tricks") &&
            !nav.pathname.includes("/stances") && (
              <AnatomyNav className=" h-fit w-[80vw] max-w-[540px] text-zinc-300" />
            )}
          <div className={"h-fit"}>{children}</div>
        </div>
      </div>
    </>
  );
};

export default TheoryWrapper;
