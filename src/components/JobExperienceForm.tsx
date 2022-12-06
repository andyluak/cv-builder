import React from "react";

import resumeBuilderContent from "content/resumeBuilderContent.json";

import Input from "./ui/Input";
import Textarea from "./ui/Textarea";

type Props = {};

export default function JobExperienceForm({}: Props) {
  return (
    <form className="grid w-full grid-cols-4 place-content-center gap-4 md:w-2/3 lg:w-1/2">
      <Input
        label="Company"
        placeholder="Company"
        type="text"
        name="company"
        value=""
        className="col-span-2"
      />
      <Input
        label="Position"
        placeholder="Position"
        type="text"
        name="position"
        value=""
        className="col-span-2"
      />
      <Input
        label="Location"
        placeholder="Location"
        type="text"
        name="location"
        value=""
        className="col-span-4"
      />
      <div className="col-span-4 grid grid-cols-4">
        <Input
          label="Start Date"
          placeholder="Start Date"
          type="date"
          name="startDate"
          value=""
        />
        <Input
          label="End Date"
          placeholder="End Date"
          type="date"
          name="endDate"
          value=""
          className="col-start-4"
        />
      </div>
      <Textarea
        label="Description"
        placeholder={resumeBuilderContent.jobExperience.jobHighlight}
        name="description"
        value=""
        className="col-span-4"
      />
    </form>
  );
}
