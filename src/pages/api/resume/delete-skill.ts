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

  if (req.method !== "DELETE") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }
  const {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    user: { id: userId },
  } = session;
  const {
    skillId,
  }: {
    skillId: string;
  } = req.body;
  try {
    const resume = await prisma.skill.delete({
      where: { id: skillId },
    });
    res.status(200).json(resume);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error });
  }
};

export default createSkill;
