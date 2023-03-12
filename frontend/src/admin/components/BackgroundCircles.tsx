import React from "react";

const BackgroundCircles = () => {
  return (
    <>
      <img
        src={`/swirly.jpg`}
        className={"h-screen w-screen bg-cover blur-md"}
      />

      {/* <div className="fixed top-[50%] left-[5%] z-[-2] h-40 w-40 rounded-full bg-gradient-to-tr from-sky-500 to-teal-300 blur-md" />
      <div className="fixed top-[60%] left-[70%] z-[-2] h-40 w-40 rounded-full bg-gradient-to-tr from-sky-300 to-teal-600 blur-md" />
      <div className="fixed top-[20%] left-[40%] z-[-2] h-40 w-40 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-300 blur-md" /> */}
    </>
  );
};

export default BackgroundCircles;
