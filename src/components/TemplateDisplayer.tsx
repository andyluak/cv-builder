import cx from "clsx";
import React, { useMemo, useState } from "react";

import type { IEducation, IJob } from "src/types/resume";

type Props = {
  template: string;
  LinkedButton: React.FC;
  style?: object;
  firstName?: string;
  lastName?: string;
  position?: string;
  address?: string;
  phone?: string;
  email?: string;
  jobExperiences?: IJob[];
  educations?: IEducation[];
  skills?: string[];
  profileDescription?: {
    text: string;
  };
  description?: string;
  isPreview?: boolean;
};

function TemplateDisplayer({
  template,
  LinkedButton,
  style,
  firstName,
  lastName,
  position,
  address,
  phone,
  email,
  jobExperiences,
  educations,
  skills,
  profileDescription,
  isPreview,
  description,
}: Props) {
  const [showButton, setShowButton] = useState(false);
  // memoize the template component
  const TemplateComponent = useMemo(() => {
    return React.lazy(() => import(`src/components/templates/${template}`));
  }, [template]);

  return (
    <div>
      <React.Suspense fallback={<div>Loading...</div>}>
        <div
          className={cx(
            "relative cursor-pointer overflow-hidden outline-red-500 hover:outline-double hover:outline-2",
            {
              "w-[200px]": isPreview,
            }
          )}
          onMouseEnter={() => setShowButton(true)}
          onMouseLeave={() => setShowButton(false)}
        >
          <div
            className={cx("select-none overflow-hidden", {
              "h-80 text-[9px]": isPreview,
            })}
          >
            <TemplateComponent
              style={style}
              firstName={firstName}
              lastName={lastName}
              position={position}
              address={address}
              phone={phone}
              email={email}
              jobExperiences={jobExperiences}
              educations={educations}
              skills={skills}
              profileDescription={profileDescription?.text}
              description={description}
            />
          </div>
          {showButton && <LinkedButton />}
        </div>
      </React.Suspense>
    </div>
  );
}

export default TemplateDisplayer;
