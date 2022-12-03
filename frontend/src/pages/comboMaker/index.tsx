import dynamic from "next/dynamic";
import React from "react";
const ComboMaker = dynamic(
  () => import("@old_pages/comboMakerV2/ComboMakerV3")
);
const ComboMakerPage = () => {
  return <ComboMaker />;
};

export default ComboMakerPage;
