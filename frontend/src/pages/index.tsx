import { NextPage } from "next";
import React from "react";
import LandingPage from "./landing/index";
const Index: NextPage = ({ a }) => {
  return (
    <>
      <LandingPage a={a} />
    </>
  );
};

export default Index;

export const getStaticProps = async (props) => {
  return {
    props: {
      a: Math.random() > 0.5 ? true : false,
    },
  };
};
