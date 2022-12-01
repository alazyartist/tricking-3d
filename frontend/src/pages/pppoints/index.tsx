import dynamic from "next/dynamic";
import React from "react";
const PointsPage = dynamic(() => import("@old_pages/pppoints/PointsPage"), {
  ssr: false,
});
const PPpointsPage = () => {
  return <PointsPage />;
};

export default PPpointsPage;
