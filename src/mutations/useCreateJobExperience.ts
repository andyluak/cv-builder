import { useMutation, useQueryClient } from "@tanstack/react-query";

type MutationProps = {
  resumeId: string;
  company: string | FormDataEntryValue;
  position: string | FormDataEntryValue;
  to: string | FormDataEntryValue;
  from: string | FormDataEntryValue;
  description: string | FormDataEntryValue;
  jobPoints: string[] | FormDataEntryValue;
  location: string | FormDataEntryValue;
}

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
    }: MutationProps) => {
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
