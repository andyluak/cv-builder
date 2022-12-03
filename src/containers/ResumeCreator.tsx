import React, { useState } from "react";
import { z } from "zod";

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
  const [basicInformation, setBasicInformation] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

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
      component: <JobExperience />,
    },
  ];
  return <MultiStepForm stepsContent={createResumeMultiStepFormContent} />;
}
