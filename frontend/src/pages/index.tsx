import { NextPage } from "next";
import React from "react";
import LandingPage from "./landing/index";
const Index: NextPage<{ a: boolean }> = ({ a }) => {
  return (
    <>
      <LandingPage a={a} />
    </>
  );
};

export default Index;

export const getServerSideProps = async (props) => {
  const { req } = props;
  const sessionID = req.cookies.__session;

  console.log(req, sessionID);

  if (sessionID) {
    // User is not logged in, you can handle this case accordingly
    return {
      redirect: {
        destination: "/home", // Redirect the user to the login page
        permanent: false,
      },
    };
  }
  if (!sessionID) {
    return {
      props: {
        a: Math.random() > 0.5 ? true : false,
      },
      revalidate: 120,
    };
  }
};
