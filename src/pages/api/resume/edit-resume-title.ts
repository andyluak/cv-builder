import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "src/server/db/client";

import type { IEducation, IJob, IJobPoint } from "src/types/resume";

import { getServerAuthSession } from "../../../server/common/get-server-auth-session";

const addResume = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });
  if (!session) {
    res.status(401).json({
      error:
        "You must be signed in to view the protected content on this page.",
    });
    return;
  }

  if (req.method !== "PUT") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }
  const {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    user: { id: userId },
  } = session;
  const { title, resumeId } = req.body;
  console.log("title", title);
  console.log("resumeId", resumeId);
  try {
    const resume = await prisma.resume.update({
      where: {
        id: resumeId,
      },
      data: { title },
    });
    res.status(200).json(resume);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error });
  }
};

export default addResume;
