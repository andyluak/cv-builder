import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "src/server/db/client";

import { getServerAuthSession } from "../../../server/common/get-server-auth-session";

const resume = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });
  if (session) {
    switch (req.method) {
      case "POST": {
      }
    }

    try {
      const resumes = await prisma.resume.findMany({
        where: {
          userId: session?.user?.id,
        },
        include: {
          userInfo: true,
          jobs: {
            include: { jobPoints: true },
          },
          educations: true,
          skills: true,
          profileDescriptions: true,
          links: true,
        },
      });
      res.status(200).json(resumes);
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.send({
      error:
        "You must be signed in to view the protected content on this page.",
    });
  }
};

export default resume;
