import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "src/server/db/client";

import { getServerAuthSession } from "../../../server/common/get-server-auth-session";

const createSkill = async (req: NextApiRequest, res: NextApiResponse) => {
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
  const {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    user: { id: userId },
  } = session;
  const {
    skill,
    resumeId,
  }: {
    skill: string;
    resumeId: string;
  } = req.body;
  try {
    console.log(skill, resumeId, userId)
    const resume = await prisma.resume.update({
      where: {
        id: resumeId,
      },
      data: {
        skills: {
          create: {
            label: skill,
            userId,
          },
        },
      },
    });
    res.status(200).json(resume);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error });
  }
};

export default createSkill;
