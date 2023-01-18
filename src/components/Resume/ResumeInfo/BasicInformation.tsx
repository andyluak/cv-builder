import React from "react";

import Button from "src/components/ui/Button";
import Input from "src/components/ui/Input";
import Textarea from "src/components/ui/Textarea";

type Props = {
  firstName: string;
  lastName: string;
  position: string;
  phone: string;
  email: string;
  profileDescription: string;
};

function BasicInformation({
  firstName,
  lastName,
  position,
  phone,
  email,
  profileDescription,
}: Props) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
  };

  return (
    <form
      className="col-span-4 grid grid-cols-4 place-items-center gap-2"
      onSubmit={handleSubmit}
    >
      <Input
        label="First Name"
        placeholder="First Name"
        type="text"
        defaultValue={firstName}
        name="firstName"
        className="col-span-2 w-full"
        value={undefined}
      />
      <Input
        label="Last Name"
        placeholder="Last Name"
        type="text"
        defaultValue={lastName}
        name="lastName"
        className="col-span-2 w-full"
        value={undefined}
      />
      <Input
        label="Position"
        placeholder="Position"
        type="text"
        defaultValue={position}
        name="position"
        className="col-span-4 w-full"
        value={undefined}
      />
      <Input
        label="Phone"
        placeholder="Phone"
        type="tel"
        defaultValue={phone}
        name="phone"
        className="col-span-4 w-full md:col-span-2"
        value={undefined}
      />
      <Input
        label="Email"
        placeholder="Email"
        type="email"
        defaultValue={email}
        name="email"
        className="col-span-4 w-full md:col-span-2"
        value={undefined}
      />
      <Textarea
        label="Profile Description"
        placeholder="Tell us something about yourself"
        className="col-span-4 w-full"
        name="profileDescription"
        defaultValue={profileDescription}
        value={undefined}
      />
      <Button
        variant="primary"
        size="lg"
        type="submit"
        className="justify-self-start"
      >
        Save Changes
      </Button>
    </form>
  );
}

export default BasicInformation;
