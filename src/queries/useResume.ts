import { useQuery } from "@tanstack/react-query";

function useResume(id: string) {
  const {
    isLoading,
    isError,
    data: resume,
  } = useQuery({
    queryKey: ["resume", id],
    queryFn: async () => {
      const res = await fetch(`/api/resume/${id}`);

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      return res.json();
    },
  });

  return { isLoading, isError, resume };
}

export default useResume;
