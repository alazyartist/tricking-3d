import { NextPage } from "next";
import React from "react";
import LandingPage from "./landing/index";
const Index: NextPage = () => {
  return (
    <div className="flex w-full flex-col place-content-center place-items-center">
      <LandingPage />
    </div>
  );
};

export default Index;
