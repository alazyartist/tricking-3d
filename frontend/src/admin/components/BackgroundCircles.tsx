import Image from "next/image";
import React from "react";

const BackgroundCircles = () => {
  return (
    <Image
      alt="swirly background"
      width={1920}
      height={1080}
      src={`/swirly.jpg`}
      className={
        "noTouch absolute z-[-1] h-screen w-screen touch-none mix-blend-multiply blur-md"
      }
    />
  );
};

export default BackgroundCircles;
