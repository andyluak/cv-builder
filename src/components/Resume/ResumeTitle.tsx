import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

import type { IResume } from "src/types/resume";

import Pencil from "public/edit-button.svg";

import Input from "../ui/Input";

type Props = {
  resumeId: string;
  title: string;
};

function ResumeTitle({ title, resumeId }: Props) {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);

  const editMutation = useMutation({
    mutationFn: async (newTitle: FormDataEntryValue) => {
      const res = await fetch("/api/resume/edit-resume-title", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle, resumeId }),
      });

      if (!res.ok) {
        const { errors } = await res.json();
        throw new Error(errors);
      }
    },
    onSuccess: (data, variables) => {
      const resumes: IResume[] | undefined = queryClient.getQueryData([
        "resumeList",
      ]);
      const editedResumes = resumes?.find(
        (resume: IResume) => resume.id === resumeId
      );

      if (!editedResumes || !resumes) return;

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      queryClient.setQueryData(["resumeList"], (oldResumes:IResume[]) => {
        return oldResumes?.map((resume: IResume) => {
          if (resume.id === resumeId) {
            return {
              ...resume,
              title: variables,
            };
          }
          return resume;
        });
      });
    },
    onSettled: () => {
      setIsEditing(false);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newTitle = formData.get("title");
    if (!newTitle) return;

    editMutation.mutate(newTitle);
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
        <h2 className="group/edit flex flex-row gap-2 py-2 hover:flex">
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
