import { NextPage } from "next";
import React from "react";
import { buildClerkProps, getAuth } from "@clerk/nextjs/server";
import LandingPage from "./landing/index";
const Index: NextPage<{ a: boolean }> = ({ a }) => {
  return (
    <>
      <LandingPage a={a} />
    </>
  );
};

export default Index;

// export const getServerSideProps = async (props) => {
//   console.log(props);
//   const auth = getAuth(props.req);
//   const userId = auth?.userId;

//   if (userId) {
//     // User is not logged in, you can handle this case accordingly
//     return {
//       redirect: {
//         destination: "/home", // Redirect the user to the login page
//         permanent: false,
//       },
//     };
//   }
//   if (!userId) {
//     return {
//       props: {
//         a: Math.random() > 0.5 ? true : false,
//         ...buildClerkProps(props.req),
//         revalidate: 120,
//       },
//     };
//   }
// };
