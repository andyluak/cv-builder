import React from "react";

import MainLayout from "src/components/layout/Main";

import resumeBuilderContent from "content/resumeBuilderContent.json";
import { useResumeContext } from "src/context/ResumeContext";
import JobExperienceForm from "src/components/JobExperienceForm";

type Props = {};

export default function JobExperience({}: Props) {

  const {jobExperiences, setJobExperiences } = useResumeContext();

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <div className="grid-row-6 grid gap-8">
        <h1 className="max-w-4xl text-4xl">
          {resumeBuilderContent.jobExperience.header}
        </h1>
        <div className="flex flex-col gap-4">
          <p className="max-w-4xl text-gray-300">
            {resumeBuilderContent.jobExperience.body}
          </p>
          <ul className="list-inside list-disc text-sm text-gray-300">
            {resumeBuilderContent.jobExperience.tips.map((tip) => {
              return <li key={tip}>{tip}</li>;
            })}
          </ul>
        </div>
      </div>
      <JobExperienceForm />
    </div>
  );
}

JobExperience.getLayout = (page: React.ReactNode) => (
  <MainLayout>{page}</MainLayout>
);
