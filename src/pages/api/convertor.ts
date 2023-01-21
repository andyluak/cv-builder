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
  const lowerCaseTemplateName = templateName.toLowerCase();
  const cssPath = path.join(
    process.cwd(),
    `templates/${templateName}/dist.css`
  );

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const template =
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require(`../../../templates/${lowerCaseTemplateName}/template`).default;
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
    page: {
      height: 4000,
    },
    pdf: {
      format: "A4",
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
