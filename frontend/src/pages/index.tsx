import { NextPage } from "next";
import React from "react";
import LandingPage from "./landing/index";
import PublicHomePage from "../old_pages/home/components/PublicHomePage";
const Index: NextPage = () => {
  return (
    <div className="flex w-full flex-col place-content-center place-items-center">
      <LandingPage />
      {/* <PublicHomePage /> */}
    </div>
  );
};

export default Index;
