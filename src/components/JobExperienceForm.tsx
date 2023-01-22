import React from "react";

import resumeBuilderContent from "content/resumeBuilderContent.json";

import Button from "./ui/Button";
import Input from "./ui/Input";
import Textarea from "./ui/Textarea";

type Props = {
  jobExperience: {
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
    jobPoints: {
      point: string;
    }[];
  };
  onHandleJobExperienceSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onHandleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function JobExperienceForm({
  jobExperience,
  onHandleJobExperienceSubmit,
  onHandleInputChange,
}: Props) {
  const onHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onHandleJobExperienceSubmit(e);
  };

  console.log(jobExperience);
  const formattedJobPoints = jobExperience.jobPoints?.map(({ point }) => {
    return `${point}`;
  });

  return (
    <form
      className="grid w-full grid-cols-4 place-content-center gap-4 md:w-2/3 lg:w-1/2"
      onSubmit={onHandleSubmit}
    >
      <Input
        label="Company"
        placeholder="Company"
        type="text"
        name="company"
        value={jobExperience.company}
        className="col-span-2"
        required
        onChange={onHandleInputChange}
      />
      <Input
        label="Position"
        placeholder="Position"
        type="text"
        name="position"
        value={jobExperience.position}
        className="col-span-2"
        required
        onChange={onHandleInputChange}
      />
      <Input
        label="Location"
        placeholder="Location"
        type="text"
        name="location"
        value={jobExperience.location}
        className="col-span-4"
        required
        onChange={onHandleInputChange}
      />
      <div className="col-span-4 grid grid-cols-4">
        <Input
          label="Start Date"
          placeholder="Start Date"
          type="date"
          name="startDate"
          value={jobExperience.startDate}
          required
          onChange={onHandleInputChange}
        />
        <Input
          label="End Date"
          placeholder="End Date"
          type="date"
          name="endDate"
          value={jobExperience.endDate}
          className="col-start-4"
          required
          onChange={onHandleInputChange}
        />
      </div>
      <Textarea
        label="Description"
        placeholder={resumeBuilderContent.jobExperience.jobHighlight}
        name="description"
        value={jobExperience.description}
        className="col-span-4"
        required
        onChange={onHandleInputChange}
      />
      <Textarea
        label="Job Points"
        defaultValue={formattedJobPoints.join("")}
        name="jobPoints"
        className="col-span-4 w-full"
        value={formattedJobPoints.join("")}
        onChange={onHandleInputChange}
      />
      <div className="col-span-4 flex flex-row justify-between">
        <Button type="submit" variant="secondary" size="lg">
          Back
        </Button>
        <Button type="submit" variant="primary" size="lg">
          Save Position
        </Button>
      </div>
    </form>
  );
}
