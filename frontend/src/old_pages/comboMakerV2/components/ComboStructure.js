import React, { useState } from "react";
import { MdInfo } from "../../../data/icons/MdIcons";
const ComboStructure = () => {
  const [info, setInfo] = useState(false);

  return (
    <>
      <div
        onClick={() => setInfo(!info)}
        className="absolute right-2 top-[3.5rem] z-20 h-10 w-10 text-2xl"
      >
        <MdInfo />
      </div>
      {info && (
        <div
          onClick={() => setInfo(!info)}
          className=" absolute left-0 top-0 z-30 flex h-full w-full place-content-center place-items-center bg-zinc-800 bg-opacity-40 backdrop-blur-md"
        >
          <div className="flex flex-col">
            <div className="text-2xl font-black">ComboStructure</div>
            <div className="rounded-xl bg-zinc-900 bg-opacity-50 p-2 px-4">
              double-Cork.hyper-hook&gt;wrap&gt;540round
            </div>
            <div className="flex place-content-center place-items-center gap-2">
              <ul className="text-xl font-bold">
                <li>-</li>
                <li>.</li>
                <li>{">"}</li>
              </ul>
              <ul className="font-light">
                <li>Used to denote variation modifiers</li>
                <li>Used to denote stance modifiers</li>
                <li>Used to denote transition</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ComboStructure;
