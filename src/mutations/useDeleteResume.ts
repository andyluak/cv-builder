import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { IResume } from "src/types/resume";

function useDeleteResume() {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: async (resumeId: string) => {
      const res = await fetch("/api/resume/delete-resume", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeId }),
      });

      if (!res.ok) {
        const { errors } = await res.json();
        console.log("errors", errors);
        throw new Error(errors);
      }
      return res;
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData<IResume[]>(["resumes"], (oldData) => {
        return oldData?.filter((resume) => resume.id !== variables);
      });
    },
  });

  return deleteMutation;
}

export default useDeleteResume;
