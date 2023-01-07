import React from "react";

type Props = {
  title: string;
  description: string;
  SvgComponent: React.FC<React.SVGProps<SVGSVGElement>>;
};

function Features({ title, description, SvgComponent }: Props) {
  return (
    <div className="flex flex-col gap-4 px-12 bg-accent items-center max-w-lg min-h-[30em] rounded-lg">
      <SvgComponent className="h-48 w-48 mt-5" />
      <div>
        <h3 className="text-center leading-snug md:text-left sm:mt-0">
          {title}
        </h3>
        <p className="text-center md:text-left">{description}</p>
      </div>
    </div>
  );
}

export default Features;
