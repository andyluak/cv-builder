import { useMutation, useQueryClient } from "@tanstack/react-query";

type CreateSkillProps = {
  skill: string;
  resumeId: string;
};

function useCreateSkill() {
  const queryClient = useQueryClient();
  const editMutation = useMutation({
    mutationFn: async ({ skill, resumeId }: CreateSkillProps) => {
      const res = await fetch("/api/resume/create-skill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skill,
          resumeId,
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

export default useCreateSkill;
