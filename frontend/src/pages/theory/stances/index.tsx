import AdvancedStanceCircle from "@components/theory/AdvancedStanceCircle";
import Stances3d from "@components/theory/Stance3d";
import TheoryWrapper from "@components/theory/TheoryWrapper";
import React from "react";

const StancePage = () => {
  return (
    <TheoryWrapper>
      {/* <AdvancedStanceCircle /> */}
      <div className={"h-[80vw] md:h-[60vh]"}>
        <Stances3d />
      </div>
    </TheoryWrapper>
  );
};

export default StancePage;
