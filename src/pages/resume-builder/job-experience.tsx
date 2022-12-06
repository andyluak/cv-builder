import Link from "next/link";
import React from "react";
import { useResumeContext } from "src/context/ResumeContext";

import JobExperiencePreview from "src/components/JobExperience";
import JobExperienceForm from "src/components/JobExperienceForm";
import MainLayout from "src/components/layout/Main";

import resumeBuilderContent from "content/resumeBuilderContent.json";

export default function JobExperience() {
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
  const [isAddingJobExperience, setIsAddingJobExperience] =
    React.useState(false);

  const onHandleJobExperienceSubmit = (e) => {
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const jobPoints = data.jobPoints.split("\n");
    const filteredJobPoints = jobPoints.filter(
      (jobPoint: string) => jobPoint !== ""
    );

    const newJobExperience = { ...data, jobPoints: filteredJobPoints };
    setJobExperiences([...jobExperiences, newJobExperience]);
    setJobExperience({
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
      jobPoints: [""],
    });
    setIsAddingJobExperience(false);
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

      {jobExperiences.length > 0 && (
        <div className="flex flex-col items-start gap-4 self-start md:self-center">
          {jobExperiences.map(
            (
              jobExperience: {
                company: string;
                position: string;
                location: string;
                startDate: string;
                endDate: string;
                description: string;
                jobPoints: string[];
              },
              index: React.Key | null | undefined
            ) => (
              <JobExperiencePreview key={index} jobExperience={jobExperience} />
            )
          )}
          <button
            className="self-start rounded-sm border border-transparent bg-gray-900 px-2 py-4 text-gray-200 transition-all hover:border-gray-200"
            onClick={() => setIsAddingJobExperience(true)}
          >
            + Add another job experience
          </button>
        </div>
      )}
      {jobExperiences.length === 0 ||
        (isAddingJobExperience && (
          <JobExperienceForm
            jobExperience={jobExperience}
            setJobExperience={setJobExperience}
            jobExperiences={jobExperiences}
            setJobExperiences={setJobExperiences}
            onHandleJobExperienceSubmit={onHandleJobExperienceSubmit}
            onHandleInputChange={onHandleInputChange}
          />
        ))}
      <div className="flex flex-row items-center justify-center gap-12">
        <Link href="/resume-builder/basic-information">
          <button className="rounded-md bg-gray-300 px-8 py-3 text-gray-900 hover:outline-double hover:outline-2 hover:outline-gray-200">
            Back
          </button>
        </Link>
        <Link href="/resume-builder/education">
          <button className="rounded-md bg-gray-900 px-8 py-3 text-gray-300 hover:outline-double hover:outline-2 hover:outline-gray-200">
            Next
          </button>
        </Link>
      </div>
    </div>
  );
}

JobExperience.getLayout = (page: React.ReactNode) => (
  <MainLayout>{page}</MainLayout>
);
