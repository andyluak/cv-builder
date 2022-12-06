import React, { useState } from "react";
import { useResumeContext } from "src/context/ResumeContext";

import NotionTemplate from "src/components/NotionTemplate";
import MainLayout from "src/components/layout/Main";
import Input from "src/components/ui/Input";

import resumeBuilderContent from "content/resumeBuilderContent.json";

export default function Education() {
  const [showButton, setShowButton] = useState(false);
  const { userInfo, jobExperiences } = useResumeContext();

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
      <div className="grid grid-cols-1 place-items-center gap-4 md:w-4/5 md:grid-cols-3">
        <div className="col-span-2 grid grid-cols-4 gap-4">
          <Input
            label="School"
            placeholder="School"
            type="text"
            value=""
            name="school"
            className="col-span-4"
          />
          <Input
            label="Degree"
            placeholder="Degree"
            type="text"
            value=""
            name="degree"
            className="col-span-2"
          />
          <Input
            label="Field of Study"
            placeholder="Field of Study"
            type="text"
            value=""
            name="fieldOfStudy"
            className="col-span-2"
          />
          <Input
            label="Location"
            placeholder="Location"
            type="text"
            value=""
            name="location"
            className="col-span-2"
          />
          <Input
            label="From"
            placeholder="From"
            type="date"
            value=""
            name="from"
            className="col-start-3"
          />
          <Input label="To" placeholder="To" type="date" value="" name="to" />
        </div>
        <div
          className="relative w-[200px] cursor-pointer overflow-hidden outline-red-500 hover:outline-double hover:outline-2"
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
    </div>
  );
}

Education.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
