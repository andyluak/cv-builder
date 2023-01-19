import React from "react";
import useEditBasicInformation from "src/mutations/useEditBasicInformation";

import Input from "src/components/ui/Input";
import Textarea from "src/components/ui/Textarea";

import { debounce } from "src/utils/debounce";

type Props = {
  firstName: string;
  lastName: string;
  position: string;
  phone: string;
  email: string;
  profileDescription: string;
  resumeId: string;
};

function BasicInformation({
  firstName,
  lastName,
  position,
  phone,
  email,
  profileDescription,
  resumeId,
}: Props) {
  const basicInformationMutation = useEditBasicInformation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    basicInformationMutation.mutate({
      [e.target.name]: e.target.value,
      resumeId,
    });
  };
  const debouncedHandleChange = debounce(handleChange, 500);

  return (
    <form className="col-span-4 grid grid-cols-4 place-items-center gap-2">
      <Input
        label="First Name"
        placeholder="First Name"
        type="text"
        defaultValue={firstName}
        name="firstName"
        className="col-span-2 w-full"
        value={undefined}
        onChange={debouncedHandleChange}
      />
      <Input
        label="Last Name"
        placeholder="Last Name"
        type="text"
        defaultValue={lastName}
        name="lastName"
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
        className="col-span-4 w-full"
        value={undefined}
        onChange={debouncedHandleChange}
      />
      <Input
        label="Phone"
        placeholder="Phone"
        type="tel"
        defaultValue={phone}
        name="phone"
        className="col-span-4 w-full md:col-span-2"
        value={undefined}
        onChange={debouncedHandleChange}
      />
      <Input
        label="Email"
        placeholder="Email"
        type="email"
        defaultValue={email}
        name="email"
        className="col-span-4 w-full md:col-span-2"
        value={undefined}
        onChange={debouncedHandleChange}
      />
      <Textarea
        label="Profile Description"
        placeholder="Tell us something about yourself"
        className="col-span-4 w-full"
        name="profileDescription"
        defaultValue={profileDescription}
        value={undefined}
        onChange={debouncedHandleChange}
      />
    </form>
  );
}

export default BasicInformation;
