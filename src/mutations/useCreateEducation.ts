import { useMutation, useQueryClient } from "@tanstack/react-query";

function useCreateEducation() {
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: async ({
      resumeId,
      school,
      degree,
      fieldOfStudy,
      to,
      from,
      location,
      current = false,
    }: {
      resumeId: string;
      school: string;
      degree: string;
      fieldOfStudy: string;
      to: string;
      from: string;
      location: string;
      current?: boolean;
    }) => {
      const res = await fetch("/api/resume/create-education", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeId,
          school,
          degree,
          fieldOfStudy,
          to,
          from,
          location,
          current: current || false,
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

export default useCreateEducation;
