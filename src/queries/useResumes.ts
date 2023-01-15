import { useQuery } from "@tanstack/react-query";


function useResumes() {
  const {
    isLoading,
    isError,
    data: resumes,
  } = useQuery({
    queryKey: ["resumes"],
    queryFn: async () => {
      const res = await fetch("/api/resume");

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      return res.json();
    },
  });

  return { isLoading, isError, resumes };
}

export default useResumes;
