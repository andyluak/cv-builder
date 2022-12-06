import React from "react";
import { useResumeContext } from "src/context/ResumeContext";

import JobExperienceForm from "src/components/JobExperienceForm";
import MainLayout from "src/components/layout/Main";

import resumeBuilderContent from "content/resumeBuilderContent.json";

type Props = {};

export default function JobExperience({}: Props) {
  const { jobExperiences, setJobExperiences } = useResumeContext();
  const [jobExperience, setJobExperience] = React.useState({
    company: "",
    position: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
    jobPoints: [""],
  });
  console.log(jobExperiences);
  const onHandleJobExperienceSubmit = (e) => {
    console.log("submitted");
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const jobPoints = data.jobPoints.split("\n");
    //remove empty strings
    const filteredJobPoints = jobPoints.filter(
      (jobPoint: string) => jobPoint !== ""
    );

    const newJobExperience = { ...data, jobPoints: filteredJobPoints };

    console.log(newJobExperience);

    setJobExperiences([...jobExperiences, newJobExperience]);
  };

  const onHandleInputChange = (e) => {
    if (e.target.name === "jobPoints") {
      setJobExperience({
        ...jobExperience,
        [e.target.name]: e.target.value.split("\n"),
      });
    }
    setJobExperience({ ...jobExperience, [e.target.name]: e.target.value });
  };

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
      {jobExperiences.length === 0 && (
        <JobExperienceForm
          jobExperience={jobExperience}
          setJobExperience={setJobExperience}
          jobExperiences={jobExperiences}
          setJobExperiences={setJobExperiences}
          onHandleJobExperienceSubmit={onHandleJobExperienceSubmit}
          onHandleInputChange={onHandleInputChange}
        />
      )}
    </div>
  );
}

JobExperience.getLayout = (page: React.ReactNode) => (
  <MainLayout>{page}</MainLayout>
);
