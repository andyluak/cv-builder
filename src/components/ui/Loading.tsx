import React from "react";

type Props = {
  message?: string;
};

function Loading({ message }: Props) {
  return (
    <div>
      <div className="flex min-h-screen flex-col items-center justify-center gap-2">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900"></div>

        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default Loading;
