import React from "react";
interface CombodexProps {
  combo: any;
  comboArray?: Array<any>;
  setCombodexopen?: any;
}
const Combodex: React.FC<CombodexProps> = ({
  comboArray,
  combo,
  setCombodexopen,
}) => {
  return (
    <div
      className={
        "absolute top-0 left-0 flex h-full w-full flex-col place-items-center bg-zinc-900 bg-opacity-[90%] backdrop-blur-md"
      }
      onClick={() => setCombodexopen(false)}
    >
      <div>Combodex</div>
      <div>{combo?.name}</div>
    </div>
  );
};

export default Combodex;
