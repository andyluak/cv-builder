import React, { memo, useMemo, useState } from "react";

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
  profileDescription?: string;
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
          className="relative w-[200px] cursor-pointer overflow-hidden outline-red-500 hover:outline-double hover:outline-2"
          onMouseEnter={() => setShowButton(true)}
          onMouseLeave={() => setShowButton(false)}
        >
          <div className="h-80 select-none overflow-hidden text-[9px]">
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
              profileDescription={profileDescription}
            />
          </div>
          {showButton && <LinkedButton />}
        </div>
      </React.Suspense>
    </div>
  );
}

export default TemplateDisplayer;
