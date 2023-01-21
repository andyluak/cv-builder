import React from "react";

import Input from "src/components/ui/Input";

import useCreateSkill from "src/mutations/useCreateSkill";

import type { ISavedSkill } from "src/types/resume";

import Skill from "./Skill";

type Props = {
  skills: ISavedSkill[];
  resumeId: string;
};

function SkillForm({ skills, resumeId }: Props) {
  const createSkill = useCreateSkill();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const skill = formData.get("skill") as string;
    createSkill.mutate(
      { skill, resumeId },
      {
        onSuccess: () => {
          // @ts-ignore
          e.target[0].value = "";
        },
      }
    );
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <Input
        placeholder="Add a skill"
        defaultValue=""
        value={undefined}
        name="skill"
        type="text"
      />
      <div className="flex flex-row flex-wrap gap-4">
        {skills.map((skill: ISavedSkill, index: number) => (
          <Skill key={index} skill={skill} resumeId={resumeId} />
        ))}
      </div>
    </form>
  );
}

export default SkillForm;
