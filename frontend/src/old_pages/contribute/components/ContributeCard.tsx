import React from "react";

const ContributeCard = ({ children }) => {
  return (
    <div
      className={
        "h-fit max-w-[400px] rounded-md bg-zinc-900 bg-opacity-80 p-2 md:h-full md:max-w-[60vw]"
      }
    >
      {children}
    </div>
  );
};

export default ContributeCard;
