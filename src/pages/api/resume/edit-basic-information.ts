import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "src/server/db/client";

import { getServerAuthSession } from "../../../server/common/get-server-auth-session";

const editBasicInformation = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
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

  // the body can contain any of the following fields : resumeId, firstName, lastName, position, email, phone, profileDescription

  const resumeId = req.body.resumeId;
  delete req.body.resumeId;
  if (!resumeId) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  try {
    if (req.body.profileDescription) {
      const resume = await prisma.resume.update({
        where: {
          id: resumeId,
        },
        data: {
          profileDescriptions: {
            update: {
              text: req.body.profileDescription,
            },
          },
        },
      });
    } else {
      const resume = await prisma.resume.update({
        where: {
          id: resumeId,
        },
        data: {
          userInfo: {
            update: {
              ...req.body,
            },
          },
        },
      });
    }

    res.status(200).json('success');
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error });
  }

  // const {
  //   resumeId,
  //   firstName,
  //   lastName,
  //   position,
  //   email,
  //   phone,
  //   profileDescription,
  // }: {
  //   resumeId: string;
  //   firstName: string;
  //   lastName: string;
  //   position: string;
  //   email: string;
  //   phone: string;
  //   profileDescription: string;
  // } = req.body;

  // if (
  //   !resumeId ||
  //   !firstName ||
  //   !lastName ||
  //   !position ||
  //   !email ||
  //   !phone ||
  //   !profileDescription
  // ) {
  //   res.status(400).json({ error: "Missing required fields" });
  //   return;
  // }

  // try {
  //   const resume = await prisma.resume.update({
  //     where: {
  //       id: resumeId,
  //     },
  //     data: {
  //       userInfo: {
  //         update: {
  //           firstName,
  //           lastName,
  //           position,
  //           email,
  //           phone,
  //         },
  //       },
  //       profileDescriptions: {
  //         update: {
  //           text: profileDescription,
  //         },
  //       },
  //     },
  //   });
  //   res.status(200).json(resume);
  // } catch (error) {
  //   console.log("error", error);
  //   res.status(500).json({ error });
  // }
};

export default editBasicInformation;
