import React from "react";
import DeveloperCard from "./components/DeveloperCard";

function AboutUs() {
  return (
    <>
      <div
        id="sticky-header"
        className="sticky top-0 z-[-3] h-14 bg-zinc-900"
      ></div>
      <div className="fixed top-0 left-0 z-[-2] h-full w-full place-content-center bg-gradient-to-tl from-[#0c1933] to-zinc-900 bg-blend-soft-light"></div>

      <div className="flex flex-col place-items-center justify-center font-inter text-zinc-300">
        <h1 className="text-2xl font-bold ">AboutUs</h1>
        <div id="developer-cards" className="flex flex-col gap-3">
          <h2 className="text-center text-3xl">Developers</h2>
          <DeveloperCard
            name="Dylan James"
            title="Project Lead"
            src="./mesquared.jpg"
          />
          <DeveloperCard
            name="Steven French"
            title="Senior Developer"
            src="https://github.com/Tohzt.png"
          />
          {/* <DeveloperCard
						name='Tim Vo'
						title='Senior Developer'
						src='./noimg.jpeg'
					/> */}
        </div>
        {/* <h2>Motion Capture</h2> */}
        {/* <h2>Investors</h2> */}
      </div>
    </>
  );
}

export default AboutUs;
