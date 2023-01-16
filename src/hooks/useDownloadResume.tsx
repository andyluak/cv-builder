import React from "react";

import type { IResume } from "src/types/resume";

type Props = {
  resume: IResume;
};

function useDownloadResume({ resume }: Props) {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleDownload = async () => {
    const { template, userInfo, jobs, educations, skills } = resume;
    setIsLoading(true);
    const res = await fetch("/api/convertor", {
      method: "POST",
      body: JSON.stringify({
        template,
        userInfo,
        jobExperiences: jobs,
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

    const a = document.createElement("a");
    a.href = url;
    a.download = "CLATITE.pdf";
    a.click();
    return;
  };
  return { handleDownload, isLoading };
}

export default useDownloadResume;
