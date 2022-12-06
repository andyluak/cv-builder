import Image from "next/image";
import React from "react";

type Props = {
  education: {
    school: string;
    degree: string;
    from: string;
    to: string;
  };
};

export default function Education({ education }: Props) {
  return (
    <div className="grid w-full cursor-pointer select-none grid-cols-4 border border-gray-300 p-4 md:w-2/3 lg:w-1/2">
      <div className="col-span-3 flex flex-col gap-2">
        <h2 className="text-xl">
          {education.degree} at {education.school}
        </h2>
        <p className="text-sm text-gray-400">
          {education.from} - {education.to}
        </p>
      </div>
      <div className="col-start-5 self-center">
        <Image alt="" src={"/chevron-down.svg"} width="24" height="24" />
      </div>
    </div>
  );
}
