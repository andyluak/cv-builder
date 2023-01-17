import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { IResume } from "src/types/resume";

function useEditResumeTitle(resumeId: string, onSettledAction: () => void) {
  const queryClient = useQueryClient();
  const editMutation = useMutation({
    mutationFn: async ({
      newTitle,
      resumeId,
    }: {
      newTitle: FormDataEntryValue;
      resumeId: string;
    }) => {
      const res = await fetch("/api/resume/edit-resume-title", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle, resumeId }),
      });

      if (!res.ok) {
        const { errors } = await res.json();
        console.log("errors", errors);
        throw new Error(errors);
      }
      return res;
    },
    onSuccess: (data, variables) => {
      const resumes: IResume[] | undefined = queryClient.getQueryData([
        "resumes",
      ]);
      const editedResumes = resumes?.find(
        (resume: IResume) => resume.id === resumeId
      );
      const { newTitle } = variables;
      if (!editedResumes || !resumes) return;

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      queryClient.setQueryData(["resumes"], (oldResumes: IResume[]) => {
        console.log("oldResumes", oldResumes)
        return oldResumes?.map((resume: IResume) => {
          if (resume.id === resumeId) {
            return {
              ...resume,
              title: newTitle,
            };
          }
          return resume;
        });
      });
    },
    onSettled: () => {
      onSettledAction();
    },
  });

  return editMutation;
}

export default useEditResumeTitle;
