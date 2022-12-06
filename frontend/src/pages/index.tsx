import { useUserStore } from "@store/userStore";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import HomePage from "./home";
import LandingPage from "./landing/index";
const Index: NextPage = () => {
  const accessToken = useUserStore((s) => s.accessToken);
  const router = useRouter();
  useEffect(() => {
    accessToken ? router.push("/home") : router.push("/landing");
  }, []);
  return (
    <>
      <LandingPage />
    </>
  );
};

export default Index;
