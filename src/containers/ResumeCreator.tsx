import React, { useState } from "react";

import MultiStepForm from "src/components/MultiStepForm";

import JobExperience from "src/containers/JobExperienceCreator";

type Props = {
  isCreatingResume: boolean;
  setIsCreatingResume: (isCreatingResume: boolean) => void;
};

export default function ResumeCreator({
  isCreatingResume,
  setIsCreatingResume,
}: Props) {

  const onHandleBasicInformationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Basic Information Submitted");
  }

  const createResumeMultiStepFormContent = [
    {
      title: `First, let's get some basic information`,
      form: [
        {
          label: "First Name",
          name: "firstName",
          type: "text",
          placeholder: "John",
        },
        {
          label: "Last Name",
          name: "lastName",
          type: "text",
          placeholder: "Doe",
        },
        {
          label: "Email",
          name: "email",
          type: "email",
        },
        {
          label: "Phone",
          name: "phone",
          type: "tel",
        },
      ],
      onSubmit: onHandleBasicInformationSubmit,
    },

    {
      title: `Now, let's get some job experience`,
      component: <JobExperience />,
    },
  ];
  return <MultiStepForm stepsContent={createResumeMultiStepFormContent} />;
}
