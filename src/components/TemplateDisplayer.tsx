import React, { memo, useMemo, useState } from "react";

type Props = {
  template: string;
  // linkedButton is a component that will be rendered inside the template displayer
  // and will be linked to the next page
  LinkedButton: React.FC;
  style?: object;
  firstName?: string;
  lastName?: string;
};

function TemplateDisplayer({
  template,
  LinkedButton,
  style,
  firstName,
  lastName,
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
          <div className="h-80 w-[400px] select-none overflow-hidden text-[9px]">
            <TemplateComponent
              style={style}
              firstName={firstName}
              lastName={lastName}
            />
          </div>
          {showButton && <LinkedButton />}
        </div>
      </React.Suspense>
    </div>
  );
}

export default TemplateDisplayer;
