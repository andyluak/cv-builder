import Image from "next/image";
import React from "react";

type Props = {
  jobExperience: {
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
    jobPoints: string[];
  };
};

export default function JobExperience({ jobExperience }: Props) {
  const [isEditing, setIsEditing] = React.useState(false);

  return (
    <div className="grid w-full cursor-pointer select-none grid-cols-4 border border-gray-300 p-4">
      <div className="col-span-3 flex flex-col gap-2">
        <h2 className="text-xl">
          {jobExperience.position} at {jobExperience.company}
        </h2>
        <p className="text-sm text-gray-400">
          {jobExperience.startDate} - {jobExperience.endDate}
        </p>
      </div>
      <div className="col-start-5 self-center">
        <Image alt="" src={"/chevron-down.svg"} width="24" height="24" />
      </div>
    </div>
  );
}
