import Home from "@old_pages/home/Home";
import { NextPage } from "next";
import React from "react";
import { getAuth } from "@clerk/nextjs/server";
import { users } from "@prisma/client";

const HomePage: NextPage<{ userInfo: Partial<users> }> = (props) => {
  return <Home userInfo={props?.userInfo} />;
};

export default HomePage;

export const getServerSideProps = async (props) => {
  const auth = getAuth(props.req);
  const userId = auth?.userId;
  if (!userId) {
    return {
      props: {
        userInfo: null,
        revalidate: 120,
      },
    };
  }

  const userInfo = await prisma.users.findUnique({
    where: { clerk_id: userId },
    select: {
      profilePic: true,
      uuid: true,
      username: true,
      first_name: true,
      last_name: true,
      clerk_id: true,
      email: true,
      captures: { include: { capturedUser: true } },
      captured_me: { include: { user: true } },
      SessionSummaries: true,
      sessionSummaries: true,
      SessionReviewCredits: true,
    },
  });
  const userInfostringy = JSON.stringify(userInfo);
  if (userInfostringy) {
    return {
      props: {
        userInfo: userInfostringy,
        revalidate: 120,
      },
    };
  }
};
