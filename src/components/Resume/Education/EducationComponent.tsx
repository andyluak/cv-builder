import type { IEducation } from "src/types/resume";

const EducationComponent = ({
  education,
  isNewEducation,
}: {
  education?: IEducation;
  isNewEducation: boolean;
}) => {
  return (
    <div className="color-secondary text-md flex min-w-full cursor-pointer select-none flex-col items-start gap-1 bg-slate-100 p-4">
      {isNewEducation ? (
        <p className="font-bold">Add Education</p>
      ) : (
        <>
          <p className="font-bold">{education?.school}</p>
          <p className="font-light">
            <span>
              {education?.fieldOfStudy} | {education?.degree}
            </span>
          </p>
        </>
      )}
    </div>
  );
};

export default EducationComponent;
