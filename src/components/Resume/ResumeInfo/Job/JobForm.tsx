import React from "react";
import useEditJobExperience from "src/mutations/useEditJobExperience";

import Input from "src/components/ui/Input";
import Textarea from "src/components/ui/Textarea";

import { debounce } from "src/utils/debounce";

import { ISavedJob } from "src/types/resume";

function JobForm({ job, resumeId }: { job: ISavedJob; resumeId: string }) {
  const editJob = useEditJobExperience();

  const { id, company, position, from, to, description, jobPoints } = job;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    editJob.mutate({ id, [name]: value, resumeId });
  };
  const debouncedHandleChange = debounce(handleChange, 500);

  const formattedJobPoints = jobPoints.map(({ point }) => {
    return `${point}\n`;
  });

  return (
    <form className="col-span-4 grid grid-cols-4 place-items-center gap-2">
      <Input
        label="Company"
        placeholder="Company"
        type="text"
        defaultValue={company}
        name="company"
        className="col-span-2 w-full"
        value={undefined}
        onChange={debouncedHandleChange}
      />
      <Input
        label="Position"
        placeholder="Position"
        type="text"
        defaultValue={position}
        name="position"
        className="col-span-2 w-full"
        value={undefined}
        onChange={debouncedHandleChange}
      />
      <Input
        label="From"
        placeholder="From"
        type="date"
        defaultValue={from}
        name="from"
        className="col-span-2 w-full"
        value={undefined}
        onChange={debouncedHandleChange}
      />
      <Input
        label="To"
        placeholder="To"
        type="date"
        defaultValue={to}
        name="to"
        className="col-span-4 w-full md:col-span-2"
        value={undefined}
        onChange={debouncedHandleChange}
      />
      <Textarea
        label="Description"
        placeholder="Email"
        defaultValue={description}
        name="description"
        className="col-span-4 w-full md:col-span-4"
        value={undefined}
        onChange={debouncedHandleChange}
      />
      <Textarea
        label="Job Highlights"
        placeholder="Tell us something about yourself"
        className="col-span-4 w-full"
        name="jobPoints"
        defaultValue={formattedJobPoints.join("")}
        value={undefined}
        onChange={debouncedHandleChange}
      />
    </form>
  );
}

export default JobForm;
