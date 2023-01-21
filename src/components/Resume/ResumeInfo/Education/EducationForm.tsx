// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import React from "react";

import Button from "src/components/ui/Button";
import Input from "src/components/ui/Input";

import useEditEducation from "src/mutations/useEditEducation";

import { debounce } from "src/utils/debounce";

import type { ISavedEducation } from "src/types/resume";

function EducationForm({
  education = {},
  resumeId,
  isNewEducation = false,
}: {
  education?: ISavedEducation;
  resumeId: string;
  isNewEducation?: boolean;
}) {
  const editEducation = useEditEducation();

  const { school, degree, fieldOfStudy, from, to, location, id } = education;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    editEducation.mutate({ id, [name]: value, resumeId });
  };
  const debouncedHandleChange = debounce(handleChange, 500);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const educationData = Object.fromEntries(
      new FormData(e.currentTarget).entries()
    );

    const { school, degree, fieldOfStudy, from, to, location, id } =
      educationData as ISavedEducation;

    if (!school || !degree || !fieldOfStudy || !from || !to || !location || !id)
      return;

    // creation mutation
  };

  const formFields = [
    {
      label: "School",
      type: "text",
      defaultValue: isNewEducation ? "" : school,
      name: "school",
      className: "col-span-4 w-full",
      value: undefined,
      onChange: isNewEducation ? undefined : debouncedHandleChange,
    },
    {
      label: "Degree",
      type: "text",
      defaultValue: isNewEducation ? "" : degree,
      name: "degree",
      className: "col-span-2 w-full",
      value: undefined,
      onChange: isNewEducation ? undefined : debouncedHandleChange,
    },
    {
      label: "Field of Study",
      type: "text",
      defaultValue: isNewEducation ? "" : fieldOfStudy,
      name: "fieldOfStudy",
      className: "col-span-2 w-full",
      value: undefined,
      onChange: isNewEducation ? undefined : debouncedHandleChange,
    },
    {
      label: "From",
      type: "date",
      defaultValue: isNewEducation ? "" : from,
      name: "from",
      className: "col-span-2 w-full",
      value: undefined,
      onChange: isNewEducation ? undefined : debouncedHandleChange,
    },
    {
      label: "To",
      type: "date",
      defaultValue: isNewEducation ? "" : to,
      name: "to",
      className: "col-span-2 w-full",
      value: undefined,
      onChange: isNewEducation ? undefined : debouncedHandleChange,
    },
    {
      label: "Location",
      type: "text",
      defaultValue: isNewEducation ? "" : location,
      name: "location",
      className: "col-span-2 w-full",
      value: undefined,
      onChange: isNewEducation ? undefined : debouncedHandleChange,
    },
  ];

  return (
    <form
      className="col-span-4 grid grid-cols-4 place-items-center gap-2"
      onSubmit={isNewEducation ? handleSubmit : undefined}
    >
      {formFields.map((field) => {
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

      {isNewEducation && (
        <Button type="submit" className="col-span-4 place-self-start" size="lg">
          Add Job
        </Button>
      )}
    </form>
  );
}

export default EducationForm;
