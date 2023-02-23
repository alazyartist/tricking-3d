import React, { useEffect, useState } from "react";
import useGetTricks from "../../api/useGetTricks";
import Trick from "./trick";

const ComboMaker = () => {
  // @TODO: Create a component that makes a usable trick object from useGetTricks
  const { data: allTricks } = useGetTricks();


  return (
    <div className="screen flex-col justify-start">
      <div className="w-screen flex-center bg-white">
        <button className="btn-trick-type">Trick</button>
        <button className="btn-trick-type">Transition</button>
        <button className="btn-trick-type">Stance</button>
      </div>
      <div className="h-full flex flex-1 overflow-auto bg-red-300">
        <div className="flex flex-row flex-wrap gap-4">
          {allTricks && allTricks.map((trick) => {
            if (trick.type !== "Trick") {
              console.log("trick: ", trick);
            }
            return (
              <Trick
                startingStance={trick.takeoffStance}
                landingStance={trick.landingStance}
                type={trick.type}
                name={trick.name}
                id={trick.trick_id}
                variations="" />
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default ComboMaker;
