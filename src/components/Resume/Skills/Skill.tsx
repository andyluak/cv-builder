import React from "react";

import useDeleteSkill from "src/mutations/useDeleteSkill";

import type { ISavedSkill } from "src/types/resume";

import CloseIcon from "public/close-icon.svg";

type Props = {
  skill: ISavedSkill;
  resumeId: string;
};

function Skill({ skill, resumeId }: Props) {
  const { label } = skill;
  const deleteSkill = useDeleteSkill();

  const handleDelete = () => {
    deleteSkill.mutate({ skillId: skill.id, resumeId });
  };
  return (
    <div className="flex cursor-pointer select-none flex-row justify-between gap-10 bg-slate-100 px-4 py-2 hover:bg-slate-200">
      {label}
      <button onClick={handleDelete} type="button">
        <CloseIcon className="transition-colors hover:scale-105 hover:text-red-900" />
      </button>
    </div>
  );
}

export default Skill;
