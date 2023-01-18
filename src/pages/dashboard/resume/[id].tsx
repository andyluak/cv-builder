import { useRouter } from "next/router";
import React from "react";
import useResume from "src/queries/useResume";

import Education from "src/components/Education";
import BasicInformation from "src/components/Resume/ResumeInfo/BasicInformation";
import TemplateDisplayer from "src/components/TemplateDisplayer";
import MainLayout from "src/components/layout/Main";
import Accordion from "src/components/ui/Accordion";
import Loading from "src/components/ui/Loading";

import { IEducation } from "src/types/resume";

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
  const profileDescription = profileDescriptions[0];
  return (
    <div className="grid grid-cols-2 gap-8 p-6">
      <aside>
        <Accordion title="User Info" value="userInfo" type="single" collapsible>
          <BasicInformation
            firstName={firstName}
            lastName={lastName}
            position={position}
            phone={phone}
            email={email}
            profileDescription={profileDescription.text}
          />
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
