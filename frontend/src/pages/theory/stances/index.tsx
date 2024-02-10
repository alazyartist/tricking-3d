import AdvancedStanceCircle from "@components/theory/AdvancedStanceCircle";
import Stances3d from "@components/theory/Stance3d";
import StancesV0 from "@components/theory/stances/StancesV0";
import TheoryWrapper from "@components/theory/TheoryWrapper";
import React from "react";

const StancePage = () => {
  const [version, setVersion] = React.useState("v0");
  return (
    <TheoryWrapper>
      <div className="flex items-center justify-center gap-2 p-2">
        <button
          className={`rounded-md  p-2 px-8 text-zinc-300 ${
            version === "v0" ? "bg-zinc-800" : "bg-zinc-600"
          }`}
          onClick={() => setVersion("v0")}
        >
          2d
        </button>
        {/* <button
          className={`rounded-md bg-zinc-700 p-2 ${version}`}
          onClick={() => setVersion("v1")}
        >
          v1
        </button> */}
        <button
          className={`rounded-md  p-2 px-8 text-zinc-300 ${
            version === "v2" ? "bg-zinc-800" : "bg-zinc-600"
          }`}
          onClick={() => setVersion("v2")}
        >
          3d
        </button>
      </div>
      {version === "v0" && <StancesV0 />}
      {/* {version === "v1" && <AdvancedStanceCircle />} */}
      {version === "v2" && (
        <div className={"h-[80vw] w-[90vw] md:h-[60vh]"}>
          <Stances3d />
        </div>
      )}
    </TheoryWrapper>
  );
};

export default StancePage;
