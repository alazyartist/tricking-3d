import DiscordLink from "@components/info/DiscordLink";
import Link from "next/link";
import React from "react";
import DeveloperCard from "./components/DeveloperCard";

function AboutUs() {
  return (
    <>
      <div
        id="sticky-header"
        className="sticky top-0 z-[-3] h-14 bg-zinc-900"
      ></div>

      <div className="flex flex-col place-items-center justify-center font-inter text-zinc-300">
        <h1 className="text-2xl font-bold ">AboutUs</h1>
        <div id="developer-cards" className="flex flex-col gap-3">
          <h2 className="text-center text-3xl">Developers</h2>
          <DeveloperCard
            name="Dylan James"
            title="The Guy"
            src="./mesquared.jpg"
          />
          <DeveloperCard
            name="Steven French"
            title="Contributing Developer"
            src="https://github.com/Tohzt.png"
          />

          <DiscordLink />
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
