import React from "react";
import { useResumeContext } from "src/context/ResumeContext";

import NotionTemplate from "src/components/NotionTemplate";
import MainLayout from "src/components/layout/Main";

export default function Summary() {
  const { userInfo, jobExperiences, educations, skills, template } =
    useResumeContext();

  const handleDownload = async () => {
    const res = fetch("/api/convertor", {
      method: "POST",
      body: JSON.stringify({
        template,
        userInfo,
        jobExperiences,
        educations,
        skills,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const blob = await (await res).blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.pdf";
    a.click();
  };

  return (
    <div className="flex flex-col items-center gap-8 overflow-hidden p-8">
      <div className="relative flex select-none flex-col justify-center overflow-hidden">
        <NotionTemplate
          style={{
            transform: "scale(0.6,0.6)",
            transformOrigin: "top left",
            left: 0,
            top: 0,
            right: 0,
          }}
          firstName={userInfo.firstName}
          lastName={userInfo.lastName}
          position={userInfo.position}
          phone={userInfo.phone}
          email={userInfo.email}
          jobExperiences={jobExperiences}
          educations={educations}
          skills={skills}
        />
        <button className="absolute top-2/3 border border-transparent bg-gray-600 p-4 text-white transition-all hover:border-gray-200" onClick={handleDownload}>
          Download
        </button>
      </div>
    </div>
  );
}

Summary.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
