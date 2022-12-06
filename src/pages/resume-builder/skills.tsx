import cx from "clsx";
import Link from "next/link";
import React from "react";
import { useResumeContext } from "src/context/ResumeContext";

import NotionTemplate from "src/components/NotionTemplate";
import MainLayout from "src/components/layout/Main";
import Textarea from "src/components/ui/Textarea";

import resumeBuilderContent from "content/resumeBuilderContent.json";

export default function Skills() {
  const [showButton, setShowButton] = React.useState(false);

  const { skills, setSkills, userInfo, jobExperiences, educations } =
    useResumeContext();

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
      <div className="grid grid-cols-1 place-items-center gap-4 md:w-4/5 md:grid-cols-3">
        <Textarea
          label="Skills"
          placeholder="Enter your skills seperated by a new line"
          name="skills"
          value={skills.length > 0 ? skills.join("\n") : ""}
          className="col-span-3 w-[500px] md:col-span-2 md:w-full"
          onChange={onHandleSkillsChange}
        />
        <div
          className={cx(
            "relative w-[200px] cursor-pointer overflow-hidden outline-red-500 hover:outline-double hover:outline-2"
          )}
          onMouseEnter={() => setShowButton(true)}
          onMouseLeave={() => setShowButton(false)}
        >
          <div className="h-96 w-[400px] select-none overflow-hidden text-[9px]">
            <NotionTemplate
              style={{
                transform: "scale(0.5,0.5)",
                transformOrigin: "top left",
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
          {showButton && (
            <>
              <div className="absolute top-0 left-0 bottom-0 right-0 bg-gray-800 opacity-50"></div>
              <button className="absolute left-1/2 top-1/2 min-w-[150px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-800 p-2 text-gray-300 hover:outline-double hover:outline-2 hover:outline-gray-200">
                Preview
              </button>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-row items-center justify-center gap-12">
        <Link href="/resume-builder/skills">
          <button className="rounded-md bg-gray-300 px-8 py-3 text-gray-900 hover:outline-double hover:outline-2 hover:outline-gray-200">
            Back
          </button>
        </Link>
        <Link href="/resume-builder/summary">
          <button className="rounded-md bg-gray-900 px-8 py-3 text-gray-300 hover:outline-double hover:outline-2 hover:outline-gray-200">
            Next
          </button>
        </Link>
      </div>
    </div>
  );
}

Skills.getLayout = function getLayout(page: React.ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};
