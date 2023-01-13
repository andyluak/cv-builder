import Link from "next/link";
import React, { useState } from "react";
import { useResumeContext } from "src/context/ResumeContext";

import MainLayout from "src/components/layout/Main";
import NotionTemplate from "src/components/templates/Notion";
import Button from "src/components/ui/Button";
import Input from "src/components/ui/Input";
import Textarea from "src/components/ui/Textarea";

import resumeBuilderContent from "content/resumeBuilderContent.json";

function BasicInformation() {
  const { userInfo, setUserInfo, profileDescription, setProfileDescription } =
    useResumeContext();
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
        <p className="max-w-4xl text-gray-300">
          {resumeBuilderContent.basicInformation.body}
        </p>
      </div>

      <div className="col-span-4 grid grid-cols-4 place-items-center gap-2">
        <Input
          label="First Name"
          placeholder="First Name"
          type="text"
          value={userInfo.firstName}
          name="firstName"
          className="col-span-2 w-full md:w-[350px] md:max-w-[350px]"
          onChange={handleUserInfoChange}
        />
        <Input
          label="Last Name"
          placeholder="Last Name"
          type="text"
          value={userInfo.lastName}
          name="lastName"
          className="col-span-2 w-full md:w-[350px] md:max-w-[350px]"
          onChange={handleUserInfoChange}
        />
        <Input
          label="Position"
          placeholder="Position"
          type="text"
          value={userInfo.position}
          name="position"
          className="col-span-4 w-full"
          onChange={handleUserInfoChange}
        />
        <Input
          label="Phone"
          placeholder="Phone"
          type="tel"
          value={userInfo.phone}
          name="phone"
          className="col-span-4 w-full md:col-span-2 md:w-[350px] md:max-w-[350px]"
          onChange={handleUserInfoChange}
        />
        <Input
          label="Email"
          placeholder="Email"
          type="email"
          value={userInfo.email}
          name="email"
          className="col-span-4 w-full md:col-span-2 md:w-[350px] md:max-w-[350px]"
          onChange={handleUserInfoChange}
        />
        <Textarea
          label="Profile Description"
          placeholder="Tell us something about yourself"
          className="col-span-4 h-40 w-full"
          name="profileDescription"
          value={profileDescription}
          onChange={(e)=>setProfileDescription(e.target.value)}
        /> 
      </div>

      <div
        className="relative w-[200px] cursor-pointer overflow-hidden outline-red-500 hover:outline-double hover:outline-2"
        onMouseEnter={() => setShowButton(true)}
        onMouseLeave={() => setShowButton(false)}
      >
        <div className="h-80 w-[400px] select-none overflow-hidden bg-red-400 text-[9px]">
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

BasicInformation.getLayout = function getLayout(page: React.ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};

export default BasicInformation;
