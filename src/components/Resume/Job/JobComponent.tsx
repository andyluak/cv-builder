import { convertDateToReadable } from "src/utils/date";

import type { ISavedJob } from "src/types/resume";

const JobComponent = ({
  job,
  newJob,
}: {
  job: ISavedJob | undefined;
  newJob: boolean;
}) => {
  return (
    <div className="color-secondary text-md flex min-w-full cursor-pointer select-none flex-col items-start gap-1 bg-slate-100 p-4">
      {newJob ? (
        <p className="font-bold">Add New Job</p>
      ) : (
        <>
          <p className="font-bold">
            {job?.position} <span className="font-normal">at</span>{" "}
            <span className="font-bold"> {job?.company}</span>
          </p>
          <p className="font-light">
            {convertDateToReadable(job?.from)}-{convertDateToReadable(job?.to)}
          </p>
        </>
      )}
    </div>
  );
};

export default JobComponent;
