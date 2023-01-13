import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import Button from "src/components/ui/Button";

import RemoteWork from "public/ilustrations/remote-work.svg";

export default function ResumeList() {
  const {
    isLoading,
    isError,
    data: resumes,
  } = useQuery({
    queryKey: ["resumeList"],
    queryFn: async () => {
      const res = await fetch("/api/resume");

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      return res.json();
    },
  });
  console.log(resumes)
  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-around bg-gray-300 text-gray-700">
        <p className="animate-ping">Hang on, we are working hard...</p>
        <RemoteWork className="h-72 w-72 text-gray-700" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[300px] items-center justify-around bg-gray-300 text-gray-700">
        <div className="flex flex-col items-start gap-4">
          <p>Something went wrong.</p>

          <Button
            onClick={() => {
              window.location.reload();
            }}
            variant="tertiary"
            size="lg"
          >
            Try Again
          </Button>
        </div>
        <RemoteWork className="h-72 w-72 text-gray-700" />
      </div>
    );
  }

  return (
    <div className="m-auto flex max-w-4xl flex-col-reverse items-center overflow-hidden bg-gray-300 p-8 md:flex-row">
      {resumes && resumes.length === 0 && (
        <div className="flex flex-col gap-8 text-gray-800 md:items-start">
          <div className="flex flex-col gap-2">
            <p>
              {`It looks like you don't have any resumes yet. That's okay, we can
        help you create one!`}
            </p>
            <p>{`Don't miss out on your dream job. Create your resume now and start applying!`}</p>
          </div>

          <Link
            className="border border-gray-900 bg-gray-800 px-5 py-3 text-gray-200"
            href="/resume-builder/templates"
          >
            Create Your First Resume
          </Link>
        </div>
      )}
      <RemoteWork className="h-72 w-72 text-gray-700" />
    </div>
  );
}
