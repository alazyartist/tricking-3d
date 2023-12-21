import React from "react";
import ActiveDevNote from "@components/info/ActiveDevNote";
import Controller from "@components/media/Controller";
import DurationSlider from "./DurationSlider";
import VideoOverlay from "./VideoOverlay";

function UI() {
  return (
    <>
      <div className="pt-3"></div>
      <ActiveDevNote />
      <VideoOverlay />
      <div
        id="controller"
        className="fixed bottom-[8rem] left-0 z-[2000] w-full bg-opacity-50 p-4 pb-7  md:left-[10vw] md:w-[80vw] xl:left-[30vw] xl:w-[40vw]"
      >
        <DurationSlider />
        <Controller />
      </div>
    </>
  );
}

export default UI;
