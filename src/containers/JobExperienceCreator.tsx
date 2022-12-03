import React, { useState } from "react";

import JobExperienceForm from "src/components/JobExperienceForm";

import { JobExperience } from "src/types/jobExperience";

const jobExperienceFormContent = [
  {
    label: "Company Name",
    name: "companyName",
    type: "text",
  },
  {
    label: "Position",
    name: "position",
    type: "text",
  },
  {
    label: "Location",
    name: "location",
    type: "text",
  },
  {
    label: "From",
    name: "from",
    type: "date",
  },
  {
    label: "To",
    name: "to",
    type: "date",
  },
  {
    label: "Present",
    name: "present",
    type: "checkbox",
  },
  {
    label: "Description",
    name: "description",
    type: "textarea",
    placeholder: "🏆 Enter your most impressive job achievement here! 🏆",
  },
  {
    label: "Job Points",
    name: "jobPoints",
    type: "textarea",
    placeholder:
      "List 3-5 bullet points that describe your job experience. Divide each point with a new line",
    className: "min-h-",
  },
];

export default function JobExperienceCreator({
  jobExperiences,
  onHandleJobExperienceSubmit,
  isJobSaved,
}: {
  jobExperiences: Array<JobExperience>;
  onHandleJobExperienceSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isJobSaved: boolean;
}) {
  return (
    <div>
      {jobExperiences.length > 0 && (
        <div className="flex flex-col space-y-4">
          {jobExperiences.map((jobExperience, index) => (
            <div key={index} className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-2">
                <h3 className="text-lg font-semibold">
                  {jobExperience.companyName}
                </h3>
                <p className="text-sm text-gray-500">
                  {jobExperience.position}
                </p>
                <p className="text-sm text-gray-500">
                  {jobExperience.location}
                </p>
                <p className="text-sm text-gray-500">
                  {jobExperience.from} - {jobExperience.to}
                </p>

                <p className="text-sm text-gray-500">
                  {jobExperience.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      {!isJobSaved && (
        <JobExperienceForm
          jobExperienceFormContent={jobExperienceFormContent}
          onHandleSubmit={onHandleJobExperienceSubmit}
        />
      )}
    </div>
  );
}
