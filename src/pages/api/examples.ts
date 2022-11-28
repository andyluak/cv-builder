import { htmlToPdf } from "convert-to-pdf";
import { type NextApiRequest, type NextApiResponse } from "next";
import path from "path";

const examples = async (req: NextApiRequest, res: NextApiResponse) => {
  const cssPath = path.join(process.cwd(), `templates/${"one"}/dist.css`);

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const template = require(`../../../templates/${"one"}/template`).default;

  const jobs = [
    {
      to: "2019",
      from: "2018",
      company: "Company 1",
      position: "Position 1",
      highlight: "Highlight 1",
      location: "Sibiu",
      jobPoints: ["Job Point 1", "Job Point 2", "Job Point 3"],
    },
    {
      to: "2019",
      from: "2018",
      company: "Company 1",
      position: "Position 1",
      highlight: "Highlight 1",
      location: "Sibiu",
      jobPoints: ["Job Point 1", "Job Point 2", "Job Point 3"],
    },
    {
      to: "2019",
      from: "2018",
      company: "Company 1",
      position: "Position 1",
      highlight: "Highlight 1",
      location: "Sibiu",
      jobPoints: ["Job Point 1", "Job Point 2", "Job Point 3"],
    },
  ];
  const html = `
  ${jobs
    .map(({ to, from, position, location, jobPoints }) => {
      return `
      <div class="flex flex-row gap-10">
      <p><span>${to}</span>-<span>${from}</span></p>
      <div>
        <h3 class="text-xl">${position}</h3>
        <p class="italic">${location}</p>
        <h4 class="font-semibold mt-4">{{highlight}}</h4>
        <ul>
          ${jobPoints
            .map((point) => {
              return `<li>${point}</li>`;
            })
            .join("")}
        </ul>
      </div>
    </div>
      `;
    })
    .join("")}`;
  const options = {
    // template options
    template: {
      type: "CONTENT", // If the template in in the form of a file
      content: `${template(html)}`,
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

  return res.status(200).send(pdf);
};

export default examples;
