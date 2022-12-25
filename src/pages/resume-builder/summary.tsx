import React from "react";
import { useResumeContext } from "src/context/ResumeContext";

import NotionTemplate from "src/components/templates/Notion";
import MainLayout from "src/components/layout/Main";
import Button from "src/components/ui/Button";

export default function Summary() {
  const { userInfo, jobExperiences, educations, skills, template } =
    useResumeContext();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleDownload = async (isDownload: boolean) => {
    setIsLoading(true);
    console.log(template);
    const res = await fetch("/api/convertor", {
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
    const arrayBuffer = await res.arrayBuffer();
    const file = new File([arrayBuffer], "CLATITE", {
      type: "application/pdf",
    });

    const url = window.URL.createObjectURL(file);

    setIsLoading(false);

    if (isDownload) {
      const a = document.createElement("a");
      a.href = url;
      a.download = "CLATITE.pdf";
      a.click();
      return;
    }

    window.open(url, "_blank");
  };

  return (
    <div className="flex w-[21cm] flex-col items-start gap-8 overflow-hidden p-8">
      <div className="flex select-none flex-col justify-center overflow-hidden">
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
      </div>
      <div className="absolute bottom-24 flex flex-row items-center justify-center gap-4">
        <Button
          variant="primary"
          size="lg"
          onClick={() => handleDownload(true)}
        >
          {isLoading ? "Loading..." : "Download"}
        </Button>
        <Button
          variant="primary"
          size="lg"
          onClick={() => handleDownload(false)}
        >
          {isLoading ? "Loading..." : "Preview"}
        </Button>
      </div>
    </div>
  );
}

Summary.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
