import BackgroundCircles from "@admin/components/BackgroundCircles";
import MovingBackground from "@old_pages/landing/components/MovingBackground";
import React from "react";

function AppBackground(props) {
  return (
    <div
      id="App-Background"
      className="noTouch fixed left-0 top-0 z-[-2] h-screen w-screen touch-none place-content-center overflow-hidden bg-gradient-to-b from-zinc-900 to-zinc-800"
    >
      {/* <MovingBackground /> */}
      <BackgroundCircles />
      {props.children}
    </div>
  );
}

export default AppBackground;
