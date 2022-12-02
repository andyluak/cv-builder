import React, { useState } from "react";

import MultiStepForm from "src/components/MultiStepForm";
import Modal from "src/components/ui/Modal";

type Props = {
  isCreatingResume: boolean;
  setIsCreatingResume: (isCreatingResume: boolean) => void;
};

export default function ResumeCreator({
  isCreatingResume,
  setIsCreatingResume,
}: Props) {
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
    },

    {
      title: `Now, let's get some job experience`,
      component: <div />,
    },
  ];
  return (
    <Modal className="min-h-[500px]" setOpen={setIsCreatingResume}>
      <MultiStepForm stepsContent={createResumeMultiStepFormContent} />
    </Modal>
  );
}
