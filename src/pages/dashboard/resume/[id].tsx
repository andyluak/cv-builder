import { useRouter } from "next/router";
import React from "react";
import useResume from "src/queries/useResume";

import BasicInformation from "src/components/Resume/ResumeInfo/BasicInformation";
import TemplateDisplayer from "src/components/TemplateDisplayer";
import MainLayout from "src/components/layout/Main";
import Accordion from "src/components/ui/Accordion";
import Loading from "src/components/ui/Loading";

import { convertDateToReadable } from "src/utils/date";
import { ISavedJob } from "src/types/resume";
import JobForm from "src/components/Resume/ResumeInfo/Job/JobForm";

function Resume() {
  const router = useRouter();
  const id = router.query.id as string;

  const { isLoading, isError, resume } = useResume(id);

  if (isLoading) return <Loading message="Loading resume..." />;

  if (isError) return <div>Something went wrong</div>;

  const {
    userInfo: { firstName, lastName, email, phone, address, position },
    jobs,
    educations,
    skills,
    profileDescriptions,
    template,
  } = resume;
  const profileDescription = profileDescriptions;

  const JobComponent = ({ job }) => {
    return (
      <div
        key={job.id}
        className="color-secondary text-md flex min-w-full cursor-pointer select-none flex-col items-start gap-1 bg-slate-100 p-4"
      >
        <p className="font-bold">
          {job.position} <span className="font-normal">at</span>{" "}
          <span className="font-bold"> {job.company}</span>
        </p>
        <p className="font-light">
          {convertDateToReadable(job.from)}-{convertDateToReadable(job.to)}
        </p>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-2 gap-8 p-6">
      <aside className="flex flex-col gap-6">
        <Accordion
          triggerComponent="User Info"
          value="userInfo"
          type="single"
          collapsible
          hasChevron
        >
          <BasicInformation
            firstName={firstName}
            lastName={lastName}
            position={position}
            phone={phone}
            email={email}
            profileDescription={profileDescription.text}
            resumeId={id}
          />
        </Accordion>
        <Accordion
          triggerComponent="Work Experience"
          value="userInfo"
          type="single"
          collapsible
          hasChevron
        >
          <div className="flex flex-col gap-2">
            {jobs.map((job:ISavedJob) => (
              <Accordion
                key={job.id}
                triggerComponent={<JobComponent job={job} />}
                value={job.id}
                type="single"
                collapsible
              >
                <JobForm job={job} />
              </Accordion>
            ))}
          </div>
        </Accordion>
      </aside>
      <div>
        <TemplateDisplayer
          firstName={firstName}
          lastName={lastName}
          email={email}
          phone={phone}
          address={address}
          position={position}
          jobExperiences={jobs}
          educations={educations}
          skills={skills}
          profileDescription={profileDescription}
          template={template}
          LinkedButton={() => {
            return null;
          }}
        />
      </div>
    </div>
  );
}

export default Resume;

Resume.getLayout = function getLayout(page: React.ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};
