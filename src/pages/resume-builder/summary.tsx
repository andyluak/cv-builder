import React from "react";
import { useResumeContext } from "src/context/ResumeContext";

import MainLayout from "src/components/layout/Main";
import NotionTemplate from "src/components/templates/Notion";
import Button from "src/components/ui/Button";

export default function Summary() {
  const {
    userInfo,
    jobExperiences,
    educations,
    skills,
    template,
    profileDescription,
    clearAllData,
  } = useResumeContext();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleDownload = async (isDownload: boolean) => {
    setIsLoading(true);
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

  const handleSave = async () => {
    try {
      const res = await fetch("/api/resume/add-resume", {
        method: "POST",
        body: JSON.stringify({
          userInfo,
          jobExperiences,
          educations,
          skills,
          profileDescription,
          template,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Something went wrong");

      clearAllData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex w-[21cm] flex-col items-start gap-8 overflow-hidden p-8">
      <div className="flex select-none flex-col justify-center overflow-hidden">
        <NotionTemplate
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
      <div className="flex flex-row items-center justify-center gap-4">
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

        <Button variant="secondary" size="lg" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
}

Summary.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
