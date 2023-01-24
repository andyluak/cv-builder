import React from "react";

import Button from "src/components/ui/Button";
import Input from "src/components/ui/Input";
import Textarea from "src/components/ui/Textarea";

import { debounce } from "src/utils/debounce";

import type { ISavedJob } from "src/types/resume";

import PositionSuggestion from "./PositionSuggestion";

type JobFormProps = {
  job?: ISavedJob | Record<string, never>;
  resumeId: string;
  newJob?: boolean;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};

function JobForm({
  job,
  resumeId,
  newJob = false,
  handleChange,
  handleSubmit,
}: JobFormProps): JSX.Element {
  const { id, company, position, from, to, description, jobPoints, location } =
    job;

  const debouncedHandleChange = debounce(handleChange, 500);

  const formattedJobPoints = jobPoints?.map(({ point }) => {
    return `${point}\n`;
  });

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
      type: "position",
      defaultValue: newJob ? "" : position,
      name: "position",
      className: "col-span-2 w-full",
      value: newJob ? undefined : position,
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

        if (field.type === "position") {
          return (
            <PositionSuggestion
              key={field.name}
              className="col-span-2 w-full"
              onChange={field.onChange}
              value={field.value}
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
