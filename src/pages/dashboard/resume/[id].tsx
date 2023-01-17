import { useRouter } from "next/router";
import React from "react";
import useResume from "src/queries/useResume";

import TemplateDisplayer from "src/components/TemplateDisplayer";
import MainLayout from "src/components/layout/Main";
import Accordion from "src/components/ui/Accordion";
import Loading from "src/components/ui/Loading";

function Resume() {
  const router = useRouter();
  const id = router.query.id as string;
  const { isLoading, isError, resume } = useResume(id);
  const {
    userInfo: { firstName, lastName, email, phone, address, position },
    jobs,
    educations,
    skills,
    profileDescription,
    template,
  } = resume;
  if (isLoading) return <Loading message="Loading resume..." />;

  if (isError) return <div>Something went wrong</div>;
  return (
    <div className="grid grid-cols-2">
      <aside>
        <Accordion
          title="Education"
          content="Education content"
          value="education"
          type="single"
          collapsible
        />
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
