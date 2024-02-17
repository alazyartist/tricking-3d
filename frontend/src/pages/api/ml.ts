import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query;
  const take = parseInt(query.take as string);
  console.log(query);
  try {
    let mlData;

    if (take) {
      mlData = await prisma.sessiondata.findMany({
        take: take,
        orderBy: {
          clipLabel: "desc",
        },
        include: {
          ClipLabel: true,
          summary: {
            select: {
              name: true,
              sessionDate: true,
              user: {
                select: {
                  username: true,
                  first_name: true,
                  last_name: true,
                  profilePic: true,
                },
              },
            },
          },
        },
      });
    } else {
      mlData = await prisma.sessiondata.findMany({
        orderBy: {
          clipLabel: "desc",
        },
        include: {
          ClipLabel: true,
          summary: {
            select: {
              name: true,
              sessionDate: true,
              user: {
                select: {
                  username: true,
                  first_name: true,
                  last_name: true,
                  profilePic: true,
                },
              },
            },
          },
        },
      });
    }

    res.status(200).json(mlData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
