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
    userInfo,
    jobExperiences,
    educations,
    skills,
    profileDescription,
    template,
  } = req.body;
  try {
    const resume = await prisma.resume.create({
      data: {
        user: {
          connect: { id: userId },
        },
        userInfo: {
          create: userInfo,
        },
        jobs: {
          create: jobExperiences.map((job: IJob) => ({
            company: job.company,
            position: job.position,
            from: job.startDate,
            to: job.endDate,
            description: job.description,
            jobPoints: {
              create: job.jobPoints.map((jobPoint: IJobPoint) => ({
                point: jobPoint,
              })),
            },
            location: job.location,
            userId,
          })),
        },
        educations: {
          create: educations.map((education: IEducation) => ({
            school: education.school,
            degree: education.degree,
            fieldOfStudy: education.fieldOfStudy,
            from: education.from,
            to: education.to,
            location: education.location,
            userId,
          })),
        },
        skills: {
          create: skills.map((skill: string) => ({
            label: skill,
            userId,
          })),
        },
        profileDescriptions: {
          create: {
            userId,
            text: profileDescription,
          },
        },
        template,
      },
    });
    res.status(200).json(resume);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error });
  }
};

export default addResume;
