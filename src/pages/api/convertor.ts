import { htmlToPdf } from "convert-to-pdf";
import { type NextApiRequest, type NextApiResponse } from "next";
import path from "path";

const examples = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    userInfo,
    template: templateName,
    jobExperiences,
    educations,
    skills,
  } = req.body;
  const cssPath = path.join(
    process.cwd(),
    `templates/${templateName}/dist.css`
  );

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const template =
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require(`../../../templates/${templateName}/template`).default;

  const options = {
    // template options
    template: {
      type: "CONTENT", // If the template in in the form of a file
      content: `${template({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        position: userInfo.position,
        phone: userInfo.phone,
        email: userInfo.email,
        jobExperiences,
        educations,
        skills,
      })}`,
      css: {
        type: "FILE",
        // the file is in the root of the project in styles/pdf.css
        content: cssPath,
      },
    },
    // data to render on the template
    data: {
      name: "John Doe",
      adress: "1234 Main St, Anytown, CA 12345",
      phone: "123-456-7890",
      email: "a@yahoo.com",
      profileDescription:
        "I am a software engineer with 5 years of experience. I have worked on many projects and I am looking for a new challenge. I am a fast learner and I am always looking to improve my skills. I am a team player and I am always willing to help others. I am a fast learner and I am always looking to improve my skills. I am a team player and I am always willing to help others.",
    },
    // additional data, used here as translations key/value
    additionalData: {
      resourceType: "CONTENT",
      data: {
        HELLO: "Hej",
      },
    },
  };
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const pdf = await htmlToPdf(options);

  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${userInfo.firstName}-${userInfo.lastName}-resume.pdf`
  );

  return res.status(200).send(pdf);
};

export default examples;
