import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "src/server/db/client";

import { getServerAuthSession } from "../../../server/common/get-server-auth-session";

const editJobExperience = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });
  if (!session) {
    res.status(401).json({
      error:
        "You must be signed in to view the protected content on this page.",
    });
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  const resumeId = req.body.resumeId;
  const userId = session.user.id;
  if (!resumeId) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  try {
    const { company, position, from, location, to, jobPoints, description } =
      req.body;
    const formattedJobPoints = jobPoints.split("\n");
    await prisma.resume.update({
      where: {
        id: resumeId,
      },
      data: {
        jobs: {
          create: {
            company,
            position,
            from,
            to,
            location,
            description,
            jobPoints: {
              create: jobPoints
                ? formattedJobPoints.map((point: string) => ({ point }))
                : [],
            },
            userId: userId,
          },
        },
      },
    });

    res.status(200).json("success");
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error });
  }
};

export default editJobExperience;
