import Home from "@old_pages/home/Home";
import { NextPage } from "next";
import React from "react";

const HomePage: NextPage = (props) => {
  console.log(props);
  return <Home />;
};

export default HomePage;

// export async function getStaticProps() {
//   return { props: { test: "HelloDylan" } };
// }
