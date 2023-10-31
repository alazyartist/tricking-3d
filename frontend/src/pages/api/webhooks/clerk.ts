import { clerkClient } from "@clerk/nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "server/db/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const _event_type = req.body.type;
  console.log(_event_type);
  if (_event_type === "user.deleted") {
    const user_id = req.body?.data?.id;
    try {
      const deletedUser = await prisma.users.delete({
        where: { clerk_id: user_id },
      });
      console.log(deletedUser);
    } catch (err) {}
  }
  if (_event_type === "user.updated") {
    const user_id = req.body?.data?.id;
    const clerkUser = await clerkClient.users.getUser(user_id);
    const user = await prisma.users.findUnique({
      where: { username: clerkUser.username },
    });
    console.log(clerkUser);
    console.log(user);
  }

  if (_event_type === "user.created") {
    const user_id = req.body?.data?.id;
    console.log(req);
    console.log(user_id);

    try {
      const clerkUser = await clerkClient.users.getUser(user_id);

      // const user = await prisma.users.create({
      // 	where: { username: clerkUser.username
      // 	,first_name:clerkUser.first_name,last_name:clerkUser.last_name,
      // 	},
      // });
      if (clerkUser) {
        const email = clerkUser.emailAddresses.find((e) => {
          return e.id === clerkUser.primaryEmailAddressId;
        });
        const user = await prisma.users.findUnique({
          where: { username: clerkUser.username },
        });
        if (user) {
          const updatedUser = await prisma.users.update({
            where: { username: clerkUser.username },
            data: { clerk_id: clerkUser.id },
          });
          console.log("updatedUser");
          console.log(updatedUser);
        } else {
          const newUser = await prisma.users.create({
            data: {
              username: clerkUser.username,
              first_name: clerkUser.firstName,
              last_name: clerkUser.lastName,
              email: email.emailAddress,
              clerk_id: clerkUser.id,
              SessionReviewCredits: 2,
            },
          });
          console.log("newUser");
          console.log(newUser);
        }
      }
      // console.log(user);
    } catch (err) {
      console.log("Failed to Create User");
      return res.status(401).json(err);
    }
  }
  if (_event_type === "session.created") {
    const user_id = req.body?.data?.user_id;
    console.log(user_id);
    const clerkUser = await clerkClient.users.getUser(user_id);
    console.log(clerkUser?.username);
    const user = await prisma.users.findUnique({
      where: { username: clerkUser.username },
    });
    console.log("user", user);
  }
}
