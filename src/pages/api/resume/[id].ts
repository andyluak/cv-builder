import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "src/server/db/client";

import { getServerAuthSession } from "../../../server/common/get-server-auth-session";

const resume = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });
  if (session) {
    if (req.method !== "GET") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    try {
      const { id } = req.query;

      if (!id || typeof id !== "string") {
        res.status(400).json({ error: "Bad request" });
        return;
      }
      const resumes = await prisma.resume.findUnique({
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
        where: {
          id: id,
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
