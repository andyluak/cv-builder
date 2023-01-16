import React from "react";

type Props = {
  message?: string;
};

function Loading({ message }: Props) {
  return (
    <div>
      <div className="flex flex-col items-center gap-2 min-h-screen justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900"></div>
        <p>Loading...</p>

        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default Loading;
