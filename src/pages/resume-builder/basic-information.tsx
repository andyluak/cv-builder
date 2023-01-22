import Link from "next/link";
import React, { useState } from "react";
import { useResumeContext } from "src/context/ResumeContext";

import BasicInformation from "src/components/Resume/ResumeInfo/BasicInformation";
import TemplateDisplayer from "src/components/TemplateDisplayer";
import MainLayout from "src/components/layout/Main";
import Button from "src/components/ui/Button";
import Input from "src/components/ui/Input";
import Textarea from "src/components/ui/Textarea";

import resumeBuilderContent from "content/resumeBuilderContent.json";

function BasicInformationPage() {
  const { userInfo, setUserInfo, template } = useResumeContext();
  const [showButton, setShowButton] = useState(false);

  const handleUserInfoChange = (e: { target: { name: any; value: any } }) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <div className="grid-row-6 grid gap-2">
        <h1 className="max-w-4xl text-4xl">
          {resumeBuilderContent.basicInformation.header}
        </h1>
        <p className="max-w-4xl text-gray-400">
          {resumeBuilderContent.basicInformation.body}
        </p>
      </div>

        <BasicInformation
          className="w-2/3"
          firstName={userInfo.firstName}
          lastName={userInfo.lastName}
          position={userInfo.position}
          phone={userInfo.phone}
          email={userInfo.email}
          profileDescription={userInfo.profileDescription}
          onChange={handleUserInfoChange}
          controlled
        />

      <div
        className="relative w-[200px] cursor-pointer overflow-hidden outline-red-500 hover:outline-double hover:outline-2"
        onMouseEnter={() => setShowButton(true)}
        onMouseLeave={() => setShowButton(false)}
      >
        <div className="h-80 w-[400px] select-none overflow-hidden bg-red-400 text-[9px]">
          <TemplateDisplayer
            key={template}
            LinkedButton={() => <></>}
            template={template}
            style={{
              width: "100%",
              maxWidth: "800px",
              height: "100%",
              fontSize: "0.3rem",
            }}
            firstName={userInfo.firstName}
            lastName={userInfo.lastName}
            position={userInfo.position}
            phone={userInfo.phone}
            email={userInfo.email}
            profileDescription={userInfo.profileDescription}
            isPreview
          />
        </div>
        {showButton && (
          <>
            <div className="absolute top-0 left-0 bottom-0 right-0 bg-gray-800 opacity-50"></div>
            <Button
              className="absolute left-1/2 top-1/2 min-w-[150px] -translate-x-1/2 -translate-y-1/2"
              variant="primary"
              size="lg"
            >
              Preview
            </Button>
          </>
        )}
      </div>
      <div className="flex flex-row items-center justify-center gap-12">
        <Link href="/resume-builder/templates">
          <Button variant="secondary" size="lg">
            Back
          </Button>
        </Link>
        <Link href="/resume-builder/job-experience">
          <Button variant="primary" size="lg">
            Next
          </Button>
        </Link>
      </div>
    </div>
  );
}

BasicInformationPage.getLayout = function getLayout(page: React.ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};

export default BasicInformationPage;
