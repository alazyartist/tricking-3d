import { NextPage } from "next";
import React from "react";
import Home from "./home/";
import PublicHomePage from "./home/components/PublicHomePage";
const Index: NextPage = () => {
  return (
    <div className="flex w-full flex-col place-content-center place-items-center">
      <Home />
      {/* <PublicHomePage /> */}
    </div>
  );
};

export default Index;
