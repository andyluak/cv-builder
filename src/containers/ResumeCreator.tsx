import React, { useState } from "react";
import { z } from "zod";

import MultiStepForm from "src/components/MultiStepForm";

import JobExperienceCreator from "src/containers/JobExperienceCreator";

import { JobExperience } from "src/types/jobExperience";

type Props = {
  isCreatingResume: boolean;
  setIsCreatingResume: (isCreatingResume: boolean) => void;
};

export default function ResumeCreator({
  isCreatingResume,
  setIsCreatingResume,
}: Props) {
  const [basicInformation, setBasicInformation] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [jobExperiences, setJobExperiences] = useState<JobExperience[]>(
    localStorage.getItem("jobExperience")
      ? JSON.parse(localStorage.getItem("jobExperience") || "")
      : []
  );
  const [isJobSaved, setIsJobSaved] = useState(false);

  const onHandleBasicInformationSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const basicInformationSchema = z.object({
      firstName: z.string(),
      lastName: z.string(),
      email: z.string().email(),
      phone: z.string(),
    });

    const basicInformation = basicInformationSchema.parse(data);

    setBasicInformation(basicInformation);
  };

  const onHandleJobExperienceSubmit = (e) => {
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
      localStorage.getItem("jobExperience") || "[]"
    );
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
        localStorage.getItem("jobExperience") || "[]"
      );
      setJobExperiences(jobExperienceArray);
    } else {
      localStorage.setItem(
        "jobExperience",
        JSON.stringify([jobExperienceWithJobPoints])
      );
      const jobExperienceArray = JSON.parse(
        localStorage.getItem("jobExperience") || "[]"
      );
      setJobExperiences(jobExperienceArray);
    }

    setIsJobSaved(true);
  };

  const createResumeMultiStepFormContent = [
    {
      title: `First, let's get some basic information`,
      form: [
        {
          label: "First Name",
          name: "firstName",
          type: "text",
          placeholder: "John",
          value: basicInformation.firstName,
        },
        {
          label: "Last Name",
          name: "lastName",
          type: "text",
          placeholder: "Doe",
          value: basicInformation.lastName,
        },
        {
          label: "Email",
          name: "email",
          type: "email",
          value: basicInformation.email,
        },
        {
          label: "Phone",
          name: "phone",
          type: "tel",
          value: basicInformation.phone,
        },
      ],
      onSubmit: onHandleBasicInformationSubmit,
    },

    {
      title: `Now, let's get some job experience`,
      component: (
        <JobExperienceCreator
          jobExperiences={jobExperiences}
          onHandleJobExperienceSubmit={onHandleJobExperienceSubmit}
          isJobSaved={isJobSaved}
        />
      ),
    },
  ];
  return <MultiStepForm stepsContent={createResumeMultiStepFormContent} />;
}
