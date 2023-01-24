import Link from "next/link";
import React, { useId } from "react";
import { useResumeContext } from "src/context/ResumeContext";

import JobComponent from "src/components/Resume/Job/JobComponent";
import JobForm from "src/components/Resume/Job/JobForm";
import MainLayout from "src/components/layout/Main";
import Accordion from "src/components/ui/Accordion";
import Button from "src/components/ui/Button";

import { ISavedJob } from "src/types/resume";

import resumeBuilderContent from "content/resumeBuilderContent.json";

export default function JobExperience() {
  const jobId = useId();
  const { jobExperiences, setJobExperiences } = useResumeContext();
  console.log(jobExperiences);
  const [jobExperience, setJobExperience] = React.useState({
    company: "",
    position: "",
    location: "",
    from: "",
    to: "",
    description: "",
    jobPoints: [
      {
        point: "",
      },
    ],
  });
  const [isAddingJobExperience, setIsAddingJobExperience] =
    React.useState(false);

  const onHandleJobExperienceSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const jobPoints = data.jobPoints.split("\n");
    const filteredJobPoints = jobPoints.filter(
      (jobPoint: { point: string }) => jobPoint?.point !== ""
    );

    const formattedJobPoints = filteredJobPoints.map((jobPoint: string) => {
      return { point: jobPoint };
    });
    const newJobExperience = {
      ...data,
      jobPoints: formattedJobPoints,
      id: jobId,
    };
    setJobExperiences([...jobExperiences, newJobExperience]);
    setJobExperience({
      company: "",
      position: "",
      location: "",
      from: "",
      to: "",
      description: "",
      jobPoints: [
        {
          point: "",
        },
      ],
    });
    setIsAddingJobExperience(false);
  };

  const onHandleInputChange = (e: any) => {
    if (e.target.name === "jobPoints") {
      setJobExperience({
        ...jobExperience,
        jobPoints: [{ point: e.target.value }],
      });
    } else {
      setJobExperience({ ...jobExperience, [e.target.name]: e.target.value });
    }
  };

  const onHandleSavedJobInputChange = (e: any, id:string) => {
    const updatedJobExperiences = jobExperiences.map(
      (jobExperience: ISavedJob) => {
        if (jobExperience.id === id) {
          return {
            ...jobExperience,
            [e.target.name]: e.target.value,
          };
        }
        return jobExperience;
      }
    );
    setJobExperiences(updatedJobExperiences);
  };

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <div className="grid-row-6 grid gap-8">
        <h1 className="max-w-4xl text-4xl">
          {resumeBuilderContent.jobExperience.header}
        </h1>
        <div className="flex flex-col gap-4 text-gray-400">
          <p className="max-w-4xl">{resumeBuilderContent.jobExperience.body}</p>
          <ul className="list-inside list-disc text-sm">
            {resumeBuilderContent.jobExperience.tips.map((tip) => {
              return <li key={tip}>{tip}</li>;
            })}
          </ul>
        </div>
      </div>

      {jobExperiences.length > 0 && (
        <div className="flex flex-col items-start gap-4 self-start md:self-center w-1/2">
          {jobExperiences.map(
            (
              jobExperience: {
                id: string;
                company: string;
                position: string;
                location: string;
                from: string;
                to: string;
                description: string;
                jobPoints: { point: string }[];
              },
              index: React.Key | null | undefined
            ) => (
              <Accordion
                className="w-full"
                key={index}
                triggerComponent={
                  <JobComponent newJob={false} job={jobExperience} />
                }
                value={`jobExperience_${jobExperience.company}_${index}}`}
                type="single"
                collapsible
              >
                <JobForm
                  job={jobExperience}
                  handleChange={(e)=>onHandleSavedJobInputChange(e, jobExperience.id)}
                />
              </Accordion>
            )
          )}
          <Button
            className="self-start rounded-sm border border-transparent bg-gray-900 px-2 py-4 text-gray-200  hover:border-gray-200"
            onClick={() => setIsAddingJobExperience(true)}
            variant="primary"
            size="lg"
          >
            + Add another job experience
          </Button>
        </div>
      )}

      {jobExperiences.length === 0 && (
        <JobForm
          newJob
          job={{}}
          handleSubmit={onHandleJobExperienceSubmit}
          handleChange={onHandleInputChange}
          className="w-1/2"
        />
      )}

      {isAddingJobExperience && (
        <JobForm
          newJob
          job={{}}
          handleSubmit={onHandleJobExperienceSubmit}
          handleChange={onHandleInputChange}
          className="w-1/2"
        />
      )}
      <div className="flex flex-row items-center justify-center gap-12">
        <Link href="/resume-builder/basic-information">
          <Button variant="secondary" size="lg">
            Back
          </Button>
        </Link>
        <Link href="/resume-builder/education">
          <Button variant="primary" size="lg">
            Next
          </Button>
        </Link>
      </div>
    </div>
  );
}

JobExperience.getLayout = (page: React.ReactNode) => (
  <MainLayout>{page}</MainLayout>
);
