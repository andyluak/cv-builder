import React from "react";
import useEditResumeTitle from "src/mutations/useEditResumeTitle";

import useEdit from "src/hooks/useEdit";

import Pencil from "public/edit-button.svg";

import Input from "../ui/Input";

type Props = {
  resumeId: string;
  title: string;
};

function ResumeTitle({ title, resumeId }: Props) {
  const { isEditing, setIsEditing } = useEdit();
  const editMutation = useEditResumeTitle(resumeId, () => setIsEditing(false));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newTitle = formData.get("title");
    if (!newTitle) return;

    editMutation.mutate({ newTitle, resumeId });
  };

  return (
    <>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder={title}
            name={"title"}
            defaultValue={title}
            value={undefined}
          />
        </form>
      ) : (
        <h2 className="group/edit flex flex-row gap-2 hover:flex">
          {title}
          <span
            className="cursor-pointer opacity-0 transition-opacity group-hover/edit:opacity-100"
            onClick={() => setIsEditing(true)}
          >
            <Pencil />
          </span>
        </h2>
      )}
    </>
  );
}

export default ResumeTitle;
