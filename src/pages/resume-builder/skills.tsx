import React from "react";
import { useResumeContext } from "src/context/ResumeContext";

import NotionTemplate from "src/components/NotionTemplate";
import MainLayout from "src/components/layout/Main";
import Textarea from "src/components/ui/Textarea";

import resumeBuilderContent from "content/resumeBuilderContent.json";

export default function Skills() {
  const { skills, setSkills } = useResumeContext();

  const onHandleSkillsChange = (e: any) => {
    setSkills(e.target.value.split("\n"));
  };

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <div className="grid-row-6 grid gap-8">
        <h1 className="max-w-4xl text-4xl">
          {resumeBuilderContent.skills.header}
        </h1>
        <div className="flex flex-col gap-4">
          <p className="max-w-4xl text-gray-300">
            {resumeBuilderContent.skills.body}
          </p>
        </div>
      </div>
      <Textarea
        label="Skills"
        placeholder="Enter your skills seperated by a new line"
        name="skills"
        value={skills.length > 0 ? skills.join("\n") : ""}
        className="w-[400px]"
        onChange={onHandleSkillsChange}
      />
    </div>
  );
}

Skills.getLayout = function getLayout(page: React.ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};
