import { useMutation, useQueryClient } from "@tanstack/react-query";

type CreateSkillProps = {
  skillId: string;
  resumeId: string;
};

function useDeleteSkill() {
  const queryClient = useQueryClient();
  const editMutation = useMutation({
    mutationFn: async ({ skillId, resumeId }: CreateSkillProps) => {
      const res = await fetch("/api/resume/delete-skill", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skillId,
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

export default useDeleteSkill;
