import React from "react";
import useCreateJobExperience from "src/mutations/useCreateJobExperience";
import useEditJobExperience from "src/mutations/useEditJobExperience";

import Button from "src/components/ui/Button";
import Input from "src/components/ui/Input";
import Textarea from "src/components/ui/Textarea";

import { debounce } from "src/utils/debounce";

import type { JobExperienceSchema } from "src/types/jobExperience";
import type { ISavedJob } from "src/types/resume";

function JobForm({
  job,
  resumeId,
  newJob = false,
}: {
  job?: ISavedJob | Record<string, never>;
  resumeId: string;
  newJob?: boolean;
}) {
  const editJob = useEditJobExperience();
  const createJob = useCreateJobExperience();

  const { id, company, position, from, to, description, jobPoints, location } =
    job;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    editJob.mutate({ id, [name]: value, resumeId });
  };
  const debouncedHandleChange = debounce(handleChange, 500);

  const formattedJobPoints = jobPoints?.map(({ point }) => {
    return `${point}\n`;
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const jobData = Object.fromEntries(new FormData(e.currentTarget).entries());

    const { company, position, from, to, description, jobPoints, location } =
      jobData as JobExperienceSchema;

    if (!company || !position || !from || !to || !description || !jobPoints)
      return;

    createJob.mutate({
      company,
      position,
      from,
      to,
      description,
      jobPoints,
      location,
      resumeId,
    });
  };

  const formFields = [
    {
      label: "Company",
      type: "text",
      defaultValue: newJob ? "" : company,
      name: "company",
      className: "col-span-2 w-full",
      value: undefined,
      onChange: newJob ? undefined : debouncedHandleChange,
    },
    {
      label: "Position",
      type: "text",
      defaultValue: newJob ? "" : position,
      name: "position",
      className: "col-span-2 w-full",
      value: undefined,
      onChange: newJob ? undefined : debouncedHandleChange,
    },
    {
      label: "Location",
      type: "text",
      defaultValue: newJob ? "" : location,
      name: "location",
      className: "col-span-4 w-full",
      value: undefined,
      onChange: newJob ? undefined : debouncedHandleChange,
    },
    {
      label: "From",
      type: "date",
      defaultValue: newJob ? "" : from,
      name: "from",
      className: "col-span-2 w-full",
      value: undefined,
      onChange: newJob ? undefined : debouncedHandleChange,
    },
    {
      label: "To",
      type: "date",
      defaultValue: newJob ? "" : to,
      name: "to",
      className: "col-span-2 w-full",
      value: undefined,
      onChange: newJob ? undefined : debouncedHandleChange,
    },
    {
      label: "Description",
      type: "textarea",
      defaultValue: newJob ? "" : description,
      name: "description",
      className: "col-span-4 w-full",
      value: undefined,
      onChange: newJob ? undefined : debouncedHandleChange,
    },
    {
      label: "Job Points",
      type: "textarea",
      defaultValue: newJob ? "" : formattedJobPoints.join(""),
      name: "jobPoints",
      className: "col-span-4 w-full",
      value: undefined,
      onChange: newJob ? undefined : debouncedHandleChange,
    },
  ];

  return (
    <form
      className="col-span-4 grid grid-cols-4 place-items-center gap-2"
      onSubmit={newJob ? handleSubmit : undefined}
    >
      {formFields.map((field) => {
        if (field.type === "textarea") {
          return (
            <Textarea
              key={field.name}
              label={field.label}
              placeholder={field.label}
              name={field.name}
              defaultValue={field.defaultValue}
              className={field.className}
              value={field.value}
              onChange={field.onChange}
            />
          );
        }
        return (
          <Input
            key={field.name}
            label={field.label}
            placeholder={field.label}
            type={field.type}
            name={field.name}
            defaultValue={field.defaultValue}
            className={field.className}
            value={field.value}
            onChange={field.onChange}
          />
        );
      })}
      {newJob && (
        <Button type="submit" className="col-span-4 place-self-start" size="lg">
          Add Job
        </Button>
      )}
    </form>
  );
}

export default JobForm;
