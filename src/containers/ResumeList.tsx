import { useQuery } from "@tanstack/react-query";
import React from "react";

import RemoteWork from "public/ilustrations/remote-work.svg";

export default function ResumeList() {
  const {
    isLoading,
    isError,
    data: resumes,
    error,
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

          <button
            onClick={() => {
              window.location.reload();
            }}
            className="rounded-md border-2 border-gray-800 bg-gray-200 px-4 py-2 text-gray-800"
          >
            Try Again
          </button>
        </div>
        <RemoteWork className="h-72 w-72 text-gray-700" />
      </div>
    );
  }

  return (
    <div className="flex flex-row items-center overflow-hidden bg-gray-300 p-8">
      {resumes && resumes.length === 0 && (
        <div className="flex flex-col items-start gap-8 text-gray-800">
          <div className="flex flex-col gap-2">
            <p>
              {`It looks like you don't have any resumes yet. That's okay, we can
        help you create one!`}
            </p>
            <p>{`Don't miss out on your dream job. Create your resume now and start applying!`}</p>
          </div>

          <button className="border border-gray-900 bg-gray-800 px-5 py-3 text-gray-200">
            Create Your First Resume
          </button>
        </div>
      )}
      <RemoteWork className="h-72 w-72 text-gray-700" />
    </div>
  );
}
