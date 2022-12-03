import dynamic from "next/dynamic";
import React from "react";
const LearnMore = dynamic(() => import("@old_pages/learnmore/LearnMore"));
const LearnMorePage = () => {
  return <LearnMore />;
};

export default LearnMorePage;
