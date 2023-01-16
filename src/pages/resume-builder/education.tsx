import cx from "clsx";
import Link from "next/link";
import React, { useState } from "react";
import { useResumeContext } from "src/context/ResumeContext";

import EducationPreview from "src/components/Education";
import EducationForm from "src/components/EducationForm";
import MainLayout from "src/components/layout/Main";
import NotionTemplate from "src/components/templates/Notion";
import Button from "src/components/ui/Button";

import resumeBuilderContent from "content/resumeBuilderContent.json";

export default function Education() {
  const [showButton, setShowButton] = useState(false);
  const [isAddingEducation, setIsAddingEducation] = useState(false);
  const [education, setEducation] = useState({
    school: "",
    degree: "",
    fieldOfStudy: "",
    location: "",
    from: "",
    to: "",
  });

  const { userInfo, jobExperiences, educations, setEducations } =
    useResumeContext();

  const handleEducationChange = (e: {
    target: { name: string; value: string };
  }) => {
    setEducation({ ...education, [e.target.name]: e.target.value });
  };

  const handleEducationSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setEducations([...educations, education]);
    setEducation({
      school: "",
      degree: "",
      fieldOfStudy: "",
      location: "",
      from: "",
      to: "",
    });
    setIsAddingEducation(false);
  };

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <div className="grid-row-6 grid gap-8">
        <h1 className="max-w-4xl text-4xl">
          {resumeBuilderContent.education.header}
        </h1>
        <div className="flex flex-col gap-4">
          <p className="max-w-4xl text-gray-300">
            {resumeBuilderContent.education.body}
          </p>
        </div>
      </div>
      {educations.length > 0 && (
        <div className="flex flex-col gap-4">
          {educations.map(
            (
              education: {
                school: string;
                degree: string;
                from: string;
                to: string;
              },
              index: React.Key | null | undefined
            ) => (
              <EducationPreview key={index} education={education} />
            )
          )}
          <Button
            className="self-start"
            variant="primary"
            size="lg"
            onClick={() => setIsAddingEducation(true)}
          >
            + Add another education
          </Button>
        </div>
      )}
      <div className="grid grid-cols-1 place-items-center gap-4 md:w-4/5 md:grid-cols-3">
        {educations.length === 0 && (
          <EducationForm
            school={education.school}
            degree={education.degree}
            location={education.location}
            fieldOfStudy={education.fieldOfStudy}
            from={education.from}
            to={education.to}
            handleEducationChange={handleEducationChange}
          />
        )}
        {isAddingEducation && (
          <EducationForm
            school={education.school}
            degree={education.degree}
            location={education.location}
            fieldOfStudy={education.fieldOfStudy}
            from={education.from}
            to={education.to}
            handleEducationChange={handleEducationChange}
          />
        )}

        <div
          className={cx(
            "relative w-[200px] cursor-pointer overflow-hidden outline-red-500 hover:outline-double hover:outline-2",
            {
              "col-span-3": !isAddingEducation && educations.length !== 0,
            }
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
            />
          </div>
          {showButton && (
            <>
              <div className="absolute top-0 left-0 bottom-0 right-0 bg-gray-800 opacity-50"></div>
              <Button
                variant="primary"
                size="lg"
                className="absolute left-1/2 top-1/2 min-w-[150px] -translate-x-1/2 -translate-y-1/2"
              >
                Preview
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-row items-center justify-center gap-12">
        <Link href="/resume-builder/job-experience">
          <Button variant="secondary" size="lg">
            Back
          </Button>
        </Link>
        {isAddingEducation || educations.length === 0 ? (
          <Button onClick={handleEducationSubmit} variant="primary" size="lg">
            Save and Continue
          </Button>
        ) : (
          <Link href="/resume-builder/skills">
            <Button variant="primary" size="lg">
              Next
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

Education.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
