import { useMutation, useQueryClient } from "@tanstack/react-query";

function useCreateJobExperience() {
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: async ({
      resumeId,
      company,
      position,
      to,
      from,
      description,
      jobPoints,
      location,
    }: {
      resumeId: string;
      company: string;
      position: string;
      to: string;
      from: string;
      description: string;
      jobPoints: string[];
      location: string;
    }) => {
      const res = await fetch("/api/resume/create-job-experience", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeId,
          company,
          position,
          to,
          from,
          description,
          jobPoints,
          location,
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

  return createMutation;
}

export default useCreateJobExperience;
