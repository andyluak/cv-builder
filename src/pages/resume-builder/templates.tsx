import Link from "next/link";
import React, { useState } from "react";
import { useResumeContext } from "src/context/ResumeContext";

import NotionTemplate from "src/components/NotionTemplate";
import MainLayout from "src/components/layout/Main";
import Input from "src/components/ui/Input";

import resumeBuilderContent from "content/resumeBuilderContent.json";

function Template() {
  const [showButton, setShowButton] = useState(false);
  const { setTemplate, userInfo, setUserInfo } = useResumeContext();

  const handleUserInfoChange = (e: { target: { name: any; value: any } }) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col items-center gap-12">
      <div className="flex flex-col gap-2">
        <h1 className="max-w-3xl text-4xl">
          {resumeBuilderContent.template.header}
        </h1>
        <p className="text-gray-300">{resumeBuilderContent.template.body}</p>
      </div>
      <div className="flex w-full flex-row justify-center gap-4">
        <Input
          label="First Name"
          placeholder="First Name"
          type="text"
          value={userInfo.firstName}
          name="firstName"
          className="w-[350px] max-w-[350px]"
          onChange={handleUserInfoChange}
        />
        <Input
          label="Last Name"
          placeholder="Last Name"
          type="text"
          value={userInfo.lastName}
          name="lastName"
          className="w-[350px] max-w-[350px]"
          onChange={handleUserInfoChange}
        />
      </div>
      <div className="grid grid-cols-3 gap-16">
        <div
          className="relative w-[200px] cursor-pointer overflow-hidden outline-red-500 hover:outline-double hover:outline-2"
          onMouseEnter={() => setShowButton(true)}
          onMouseLeave={() => setShowButton(false)}
        >
          <div className="h-80 w-[400px] select-none overflow-hidden text-[9px]">
            <NotionTemplate
              style={{
                transform: "scale(0.5,0.5)",
                transformOrigin: "top left",
              }}
              firstName={userInfo.firstName}
              lastName={userInfo.lastName}
            />
          </div>
          {showButton && (
            <>
              <div className="absolute top-0 left-0 bottom-0 right-0 bg-gray-800 opacity-50"></div>
              <Link href="/resume-builder/basic-information">
                <button
                  className="absolute left-1/2 top-1/2 min-w-[150px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-800 p-2 text-gray-300 hover:outline-double hover:outline-2 hover:outline-gray-200"
                  onClick={() => setTemplate("notion")}
                >
                  Select Template
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

Template.getLayout = function getLayout(page: React.ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};

export default Template;
