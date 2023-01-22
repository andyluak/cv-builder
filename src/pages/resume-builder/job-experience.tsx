import Link from "next/link";
import React from "react";
import { useResumeContext } from "src/context/ResumeContext";

import JobExperiencePreview from "src/components/JobExperience";
import JobExperienceForm from "src/components/JobExperienceForm";
import MainLayout from "src/components/layout/Main";
import Button from "src/components/ui/Button";

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
    jobPoints: [{
      point: "",
    }],
  });
  const [isAddingJobExperience, setIsAddingJobExperience] =
    React.useState(false);

  const onHandleJobExperienceSubmit = (e: any) => {
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
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
      jobPoints: [{
        point: "",
      }],
    });
    setIsAddingJobExperience(false);
  };

  const onHandleInputChange = (e: any) => {
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
        <JobExperienceForm
          jobExperience={jobExperience}
          setJobExperience={setJobExperience}
          jobExperiences={jobExperiences}
          setJobExperiences={setJobExperiences}
          onHandleJobExperienceSubmit={onHandleJobExperienceSubmit}
          onHandleInputChange={onHandleInputChange}
        />
      )}

      {isAddingJobExperience && (
        <JobExperienceForm
          jobExperience={jobExperience}
          setJobExperience={setJobExperience}
          jobExperiences={jobExperiences}
          setJobExperiences={setJobExperiences}
          onHandleJobExperienceSubmit={onHandleJobExperienceSubmit}
          onHandleInputChange={onHandleInputChange}
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
