"use client";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import React from "react";
const Home = dynamic(() => import("../../old_pages/home/Home"), { ssr: false });
const HomePage: NextPage = () => {
  return <Home />;
};

export default HomePage;
