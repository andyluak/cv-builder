import { useMutation, useQueryClient } from "@tanstack/react-query";

function useEditJobExperience() {
  const queryClient = useQueryClient();
  const editMutation = useMutation({
    mutationFn: async (variables: Record<string, unknown>) => {
      const res = await fetch("/api/resume/edit-job-experience", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...variables,
        }),
      });

      if (!res.ok) {
        const { errors } = await res.json();
        console.log("errors", errors);
        throw new Error(errors);
      }
      return res;
    },
    onSuccess: (data, variables) => {
      const { resumeId } = variables;
      queryClient.invalidateQueries(["resume", resumeId]);
    },
  });

  return editMutation;
}

export default useEditJobExperience;
