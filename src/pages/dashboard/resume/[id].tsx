import { useRouter } from "next/router";
import React from "react";

import EducationComponent from "src/components/Resume/Education/EducationComponent";
import EducationForm from "src/components/Resume/Education/EducationForm";
import JobComponent from "src/components/Resume/Job/JobComponent";
import JobForm from "src/components/Resume/Job/JobForm";
import BasicInformation from "src/components/Resume/ResumeInfo/BasicInformation";
import SkillForm from "src/components/Resume/Skills/SkillForm";
import TemplateDisplayer from "src/components/TemplateDisplayer";
import MainLayout from "src/components/layout/Main";
import Accordion from "src/components/ui/Accordion";
import Loading from "src/components/ui/Loading";

import useResume from "src/queries/useResume";

import useCreateJobExperience from "src/mutations/useCreateJobExperience";
import useEditJobExperience from "src/mutations/useEditJobExperience";

import type { ISavedEducation, ISavedJob } from "src/types/resume";

function Resume() {
  const router = useRouter();
  const resumeId = router.query.id as string;
  const editJob = useEditJobExperience();
  const createJob = useCreateJobExperience();

  const handleJobSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const jobData = Object.fromEntries(new FormData(e.currentTarget).entries());

    const { company, position, from, to, description, jobPoints, location } =
      jobData;

    if (
      !company ||
      !position ||
      !from ||
      !to ||
      !description ||
      !jobPoints ||
      !location
    )
      return;

    createJob.mutate({
      company,
      position,
      from,
      to,
      description,
      jobPoints,
      location,
      resumeId,
    });
  };

  const { isLoading, isError, resume } = useResume(resumeId);

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

  return (
    <div className="grid grid-cols-5 gap-8 p-6">
      <aside className="col-span-2 flex flex-col gap-6">
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
            resumeId={resumeId}
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
            {jobs
              .sort(
                (
                  { from: aFrom }: { from: string },
                  { from: bFrom }: { from: string }
                ) => new Date(aFrom).getTime() - new Date(bFrom).getTime()
              )
              .map((job: ISavedJob) => {
                const handleJobChange = (
                  e: React.ChangeEvent<HTMLInputElement>
                ) => {
                  const { name, value } = e.target;
                  const { id } = job;
                  editJob.mutate({ id, [name]: value, resumeId });
                };
                return (
                  <Accordion
                    key={job.id}
                    triggerComponent={<JobComponent newJob={false} job={job} />}
                    value={job.id}
                    type="single"
                    collapsible
                  >
                    <JobForm
                      job={job}
                      resumeId={resumeId}
                      handleChange={handleJobChange}
                    />
                  </Accordion>
                );
              })}
            <Accordion
              triggerComponent={<JobComponent newJob job={undefined} />}
              value={"newJob"}
              type="single"
              collapsible
            >
              <JobForm
                job={{}}
                newJob
                resumeId={resumeId}
                handleSubmit={handleJobSubmit}
              />
            </Accordion>
          </div>
        </Accordion>

        <Accordion
          triggerComponent="Education"
          value="userInfo"
          type="single"
          collapsible
          hasChevron
        >
          <div className="flex flex-col gap-2">
            {educations
              .sort(
                (
                  { from: aFrom }: { from: string },
                  { from: bFrom }: { from: string }
                ) => new Date(aFrom).getTime() - new Date(bFrom).getTime()
              )
              .map((education: ISavedEducation) => (
                <Accordion
                  key={education.id}
                  triggerComponent={
                    <EducationComponent
                      isNewEducation={false}
                      education={education}
                    />
                  }
                  value={education.id}
                  type="single"
                  collapsible
                >
                  <EducationForm education={education} resumeId={resumeId} />
                </Accordion>
              ))}
            <Accordion
              triggerComponent={<EducationComponent isNewEducation />}
              value={"newJob"}
              type="single"
              collapsible
            >
              <EducationForm isNewEducation resumeId={resumeId} />
            </Accordion>
          </div>
        </Accordion>
        <Accordion
          triggerComponent="Skills"
          value="userInfo"
          type="single"
          collapsible
          hasChevron
        >
          <SkillForm resumeId={resumeId} skills={skills} />
        </Accordion>
      </aside>
      <div className="col-span-3">
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
