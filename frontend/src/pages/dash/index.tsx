import React from "react";
import dynamic from "next/dynamic";
import { GetServerSideProps } from "next";
import { getAuth } from "@clerk/nextjs/server";
import { prisma } from "../../server/db/client";
const Dashboard = dynamic(() => import("@old_pages/dash/Dashboard"));
const DashboardPage = (props) => {
  return <Dashboard {...props} />;
};

export default DashboardPage;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const auth = getAuth(req);
  // console.log(auth);
  const data = await prisma.users.findUnique({
    where: { clerk_id: auth.userId },
    select: {
      uuid: true,
      profilePic: true,
      username: true,
    },
  });
  return {
    props: {
      profilePic: data.profilePic,
      uuid: data.uuid,
    },
  };
};
