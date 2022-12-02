import React, { useState } from "react";
import z from "zod";

import JobExperienceForm from "src/components/JobExperienceForm";

const jobExperienceFormContent = [
  {
    label: "Company Name",
    name: "companyName",
    type: "text",
  },
  {
    label: "Position",
    name: "position",
    type: "text",
  },
  {
    label: "Location",
    name: "location",
    type: "text",
  },
  {
    label: "From",
    name: "from",
    type: "date",
  },
  {
    label: "To",
    name: "to",
    type: "date",
  },
  {
    label: "Present",
    name: "present",
    type: "checkbox",
  },
  {
    label: "Description",
    name: "description",
    type: "textarea",
    placeholder: "Describe your job experience and highlight your achievements",
  },
  {
    label: "Job Points",
    name: "jobPoints",
    type: "textarea",
    placeholder:
      "List 3-5 bullet points that describe your job experience. Divide each point with a new line",
    className: "min-h-",
  },
];

const JobExperienceSchema = z.object({
  companyName: z.string(),
  position: z.string(),
  location: z.string(),
  from: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  to: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  present: z.boolean(),
  description: z.string(),
  jobPoints: z.array(z.string()),
});

export default function JobExperienceCreator() {
  const [jobExperiences, setJobExperiences] = useState<
    z.infer<typeof JobExperienceSchema>[]
  >([]);
  const [isCreatingJobExperience, setIsCreatingJobExperience] = useState(false);

  console.log(jobExperiences);
  const onHandleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    data.present = data.present === "true" ? true : false;

    const jobExperienceFormSchema = z.object({
      companyName: z.string(),
      position: z.string(),
      location: z.string(),
      from: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      to: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      description: z.string(),
      jobPoints: z.string(),
      present: z.boolean().optional().default(false),
    });

    const jobExperience = jobExperienceFormSchema.parse(data);

    const jobPoints = jobExperience.jobPoints
      .split("\n")
      .filter((point) => point.length > 0);

    const jobExperienceWithJobPoints = {
      ...jobExperience,
      id: Math.random().toString(36).substr(2, 9),
      jobPoints,
    };

    // save the job to local storage under the jobExperience key
    const jobExperienceFromLocalStorage = JSON.parse(
      localStorage.getItem("jobExperience")
    );
    console.log(jobExperienceFromLocalStorage);
    if (jobExperienceFromLocalStorage) {
      const uniqueJobExperience = () => {
        const uniqueJobExperience = jobExperienceFromLocalStorage.filter(
          (job: { from: string }) => job.from !== jobExperience.from
        );
        return uniqueJobExperience;
      };

      const jobExperienceToSave = [
        ...uniqueJobExperience(),
        jobExperienceWithJobPoints,
      ];

      localStorage.setItem(
        "jobExperience",
        JSON.stringify(jobExperienceToSave)
      );

      const jobExperienceArray = JSON.parse(
        localStorage.getItem("jobExperience")
      );
      setJobExperiences(jobExperienceArray);
    } else {
      localStorage.setItem(
        "jobExperience",
        JSON.stringify([jobExperienceWithJobPoints])
      );
      const jobExperienceArray = JSON.parse(
        localStorage.getItem("jobExperience")
      );
      setJobExperiences(jobExperienceArray);
    }
  };

  return (
    <div>
      <JobExperienceForm
        jobExperienceFormContent={jobExperienceFormContent}
        onHandleSubmit={onHandleSubmit}
      />
    </div>
  );
}
