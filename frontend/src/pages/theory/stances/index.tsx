import AdvancedStanceCircle from "@components/theory/AdvancedStanceCircle";
import Stances3d from "@components/theory/Stance3d";
import TheoryWrapper from "@components/theory/TheoryWrapper";
import React from "react";

const StancePage = () => {
  const [version, setVersion] = React.useState("v1");
  return (
    <TheoryWrapper>
      <div className="flex items-center justify-center gap-2">
        <button
          className="rounded-md bg-zinc-700 p-2"
          onClick={() => setVersion("v1")}
        >
          v1
        </button>
        <button
          className="rounded-md bg-zinc-700 p-2"
          onClick={() => setVersion("v2")}
        >
          v2
        </button>
      </div>
      {version === "v1" && <AdvancedStanceCircle />}
      {version === "v2" && (
        <div className={"h-[80vw] md:h-[60vh]"}>
          <Stances3d />
        </div>
      )}
    </TheoryWrapper>
  );
};

export default StancePage;
