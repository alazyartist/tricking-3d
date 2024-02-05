import { clerkClient } from "@clerk/nextjs";
import Mixpanel from "mixpanel";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "server/db/client";
const mixpanel = Mixpanel.init(process.env.MIXPANEL_TOKEN);
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const _event_type = req.body.type;
  console.log(_event_type);
  console.log("req.body", req.body);

  if (_event_type === "user.deleted") {
    const user_id = req.body?.data?.id;
    try {
      const deletedUser = await prisma.users.delete({
        where: { clerk_id: user_id },
      });
      mixpanel.track("Deleted User", { ...deletedUser });
      console.log(deletedUser);
    } catch (err) {}
  }
  if (_event_type === "user.updated") {
    const user_id = req.body?.data?.id;
    const clerkUser = await clerkClient.users.getUser(user_id);
    const user = await prisma.users.findUnique({
      where: { clerk_id: clerkUser.id },
    });
    if (user) {
      mixpanel.people.set(user.uuid, {
        $email: user.email,
        $first_name: user.first_name,
        $last_name: user.last_name,
        $username: user.username,
        $created: user.createdAt,
        $last_login: user.updatedAt,
      });
      mixpanel.track("Updated User", { ...user });
      await prisma.users.update({
        where: { clerk_id: clerkUser.id },
        data: {
          first_name: clerkUser.firstName,
          last_name: clerkUser.lastName,
          email: clerkUser.emailAddresses.find((e) => {
            return e.id === clerkUser.primaryEmailAddressId;
          }).emailAddress,
          username: clerkUser.username,
          profilePic:
            (clerkUser.hasImage === true && clerkUser.imageUrl) ?? null,
          updatedAt: new Date(),
        },
      });
    }
    return res.status(200).send("OK");
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
            data: {
              clerk_id: clerkUser.id,
              profilePic: (clerkUser.hasImage && clerkUser.imageUrl) ?? null,
            },
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
              profilePic: (clerkUser.hasImage && clerkUser.imageUrl) ?? null,
              clerk_id: clerkUser.id,
              SessionReviewCredits: 2,
            },
          });
          mixpanel.people.set(newUser.uuid, {
            $email: newUser.email,
            $first_name: newUser.first_name,
            $last_name: newUser.last_name,
            $username: newUser.username,
            $created: newUser.createdAt,
            $last_login: newUser.updatedAt,
          });
          mixpanel.track("Registered New User", { ...newUser });
          console.log("newUser");
          console.log(newUser);
        }
      }
    } catch (err) {
      console.log(err);
      console.log("Failed to Create User");
      return res.status(401).json(err);
    }
    return res.status(200).send("OK");
  }
  if (_event_type === "session.created") {
    const user_id = req.body?.data?.user_id;
    console.log("Session created for" + user_id);
    const clerkUser = await clerkClient.users.getUser(user_id);
    const user = await prisma.users.findUnique({
      where: { clerk_id: clerkUser.id },
    });
    await prisma.users.update({
      where: { clerk_id: clerkUser.id },
      data: { updatedAt: new Date() },
    });
    mixpanel.people.set(user.uuid, {
      $email: user.email,
      $first_name: user.first_name,
      $last_name: user.last_name,
      $username: user.username,
      $created: user.createdAt,
      $last_login: user.updatedAt,
    });
    mixpanel.track("Login");

    return res.status(200).send("OK");
  }
  return res.status(200).send("OK");
}
