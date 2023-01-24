import cx from "clsx";
import React from "react";

import Input from "src/components/ui/Input";
import Textarea from "src/components/ui/Textarea";

import useEditBasicInformation from "src/mutations/useEditBasicInformation";

import { debounce } from "src/utils/debounce";

type Props = {
  firstName: string;
  lastName: string;
  position: string;
  phone: string;
  email: string;
  profileDescription: string;
  resumeId?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  controlled?: boolean;
};

function BasicInformation({
  firstName,
  lastName,
  position,
  phone,
  email,
  profileDescription,
  resumeId,
  onChange,
  className,
  controlled,
}: Props) {
  const basicInformationMutation = useEditBasicInformation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    basicInformationMutation.mutate({
      [e.target.name]: e.target.value,
      resumeId,
    });
  };
  const debouncedHandleChange = debounce(handleChange, 500);

  const formFields = [
    {
      label: "First Name",
      placeholder: "First Name",
      type: "text",
      defaultValue: firstName,
      name: "firstName",
      className: "col-span-2 w-full",
      value: firstName,
      onChange: onChange ?? debouncedHandleChange,
    },
    {
      label: "Last Name",
      placeholder: "Last Name",
      type: "text",
      defaultValue: lastName,
      name: "lastName",
      className: "col-span-2 w-full",
      value: lastName,
      onChange: onChange ?? debouncedHandleChange,
    },
    {
      label: "Position",
      placeholder: "Position",
      type: "text",
      defaultValue: position,
      name: "position",
      className: "col-span-4 w-full",
      value: position,
      onChange: onChange ?? debouncedHandleChange,
    },
    {
      label: "Phone",
      placeholder: "Phone",
      type: "tel",
      defaultValue: phone,
      name: "phone",
      className: "col-span-4 w-full md:col-span-2",
      value: phone,
      onChange: onChange ?? debouncedHandleChange,
    },
    {
      label: "Email",
      placeholder: "Email",
      type: "email",
      defaultValue: email,
      name: "email",
      className: "col-span-4 w-full md:col-span-2",
      value: email,
      onChange: onChange ?? debouncedHandleChange,
    },
    {
      label: "Profile Description",
      placeholder: "Tell us something about yourself",
      className: "col-span-4 w-full",
      name: "profileDescription",
      defaultValue: profileDescription,
      value: profileDescription,
      type: "textarea",
      onChange: onChange ?? debouncedHandleChange,
    },
  ];

  return (
    <form
      className={cx(
        "col-span-4 grid grid-cols-4 place-items-center gap-2",
        className
      )}
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
              controlled
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
            controlled={controlled}
          />
        );
      })}
    </form>
  );
}

export default BasicInformation;
