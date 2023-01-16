import React from "react";

import type { IResume } from "src/types/resume";

import TemplateDisplayer from "../TemplateDisplayer";
import ResumeTitle from "./ResumeTitle";

type Props = {
  resume: IResume;
};

function ResumePreview({ resume }: Props) {
  const {
    id,
    userInfo: { firstName, lastName, email, phone, address, position },
    jobs,
    educations,
    skills,
    profileDescriptions: profileDescription,
    template,
    title,
  } = resume;
  return (
    <div key={resume.id}>
      <ResumeTitle title={title} resumeId={id} />
      <TemplateDisplayer
        style={{
          width: "100%",
          maxWidth: "800px",
          height: "100%",
          fontSize: "0.3rem",
        }}
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
  );
}

export default ResumePreview;
