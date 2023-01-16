import Link from "next/link";
import React from "react";
import useDeleteResume from "src/mutations/useDeleteResume";

import useDownloadResume from "src/hooks/useDownloadResume";

import type { IResume } from "src/types/resume";

import DownloadIcon from "public/download-icon.svg";
import EditIcon from "public/edit-button.svg";
import TrashIcon from "public/trash-icon.svg";

function ResumePreviewActions({ id, resume }: { id: string; resume: IResume }) {
  const deleteMutation = useDeleteResume();
  const { isLoading, handleDownload } = useDownloadResume({ resume });
  return (
    <div className="flex flex-row gap-3">
      <Link
        className="flex flex-row items-center gap-1 transition-transform hover:scale-110"
        href={`/dashboard/resume/${id}`}
      >
        <EditIcon />
        Edit
      </Link>
      <button className="flex flex-row  items-center gap-1 transition-transform hover:scale-110"
        disabled={isLoading}
        onClick={handleDownload}
      >
        <DownloadIcon />
        Download
      </button>
      <button
        className="flex flex-row  items-center gap-1 transition-transform hover:scale-110"
        onClick={() => deleteMutation.mutate(id)}
      >
        <TrashIcon />
        Delete
      </button>
    </div>
  );
}

export default ResumePreviewActions;
