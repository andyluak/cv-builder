import Link from "next/link";
import React from "react";

type Props = {
  callToAction: string;
  buttonLabel: string;
  onClick?: () => void;
};

function CTA({ callToAction, buttonLabel, onClick }: Props) {
  return (
    <div className="border-y border-x-secondary px-8 py-16 flex flex-col gap-8 items-center">
      <h3 className="text-lg">{callToAction}</h3>
      <button className="rounded-lg bg-accent px-4 py-4" onClick={onClick}>
        {buttonLabel}
      </button>
    </div>
  );
}

export default CTA;
