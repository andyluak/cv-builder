import React from "react";

import Input from "./ui/Input";

type Props = {
  school: string;
  degree: string;
  fieldOfStudy: string;
  location: string;
  from: string;
  to: string;
  handleEducationChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function EducationForm({
  school,
  degree,
  fieldOfStudy,
  location,
  from,
  to,
  handleEducationChange,
}: Props) {
  return (
    <form className="col-span-2 grid grid-cols-4 gap-4">
      <Input
        label="School"
        placeholder="School"
        type="text"
        value={school}
        name="school"
        className="col-span-4"
        onChange={handleEducationChange}
      />
      <Input
        label="Degree"
        placeholder="Degree"
        type="text"
        value={degree}
        name="degree"
        className="col-span-2"
        onChange={handleEducationChange}
      />
      <Input
        label="Field of Study"
        placeholder="Field of Study"
        type="text"
        value={fieldOfStudy}
        name="fieldOfStudy"
        className="col-span-2"
        onChange={handleEducationChange}
      />
      <Input
        label="Location"
        placeholder="Location"
        type="text"
        value={location}
        name="location"
        className="col-span-2"
        onChange={handleEducationChange}
      />
      <Input
        label="From"
        placeholder="From"
        type="date"
        value={from}
        name="from"
        className="col-start-3"
        onChange={handleEducationChange}
      />
      <Input
        label="To"
        placeholder="To"
        type="date"
        value={to}
        name="to"
        onChange={handleEducationChange}
      />
    </form>
  );
}
