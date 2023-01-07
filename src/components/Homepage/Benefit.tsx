import cx from "clsx";
import React from "react";

type Props = {
  title: string;
  description: string;
  SvgComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  leftImage?: boolean;
};

function Benefit({ title, description, SvgComponent, leftImage = false }: Props) {
  return (
    <div
      className={cx(
        "prose-sm mt-10 flex items-center justify-center gap-4 px-10 py-4 md:flex-row md:prose-base lg:prose-lg xl:prose-xl",
        {
          "flex-col": leftImage,
          "flex-col-reverse bg-accent": !leftImage,
        }
      )}
    >
      {leftImage && (
        <div>
          <SvgComponent className="h-64 w-64 md:h-96 md:w-96 xl:h-[600px] xl:w-[600px]" />
        </div>
      )}
      <div className={cx("flex flex-col items-center md:items-start",
      {
        "md:pl-8": leftImage,
        "md:pr-8": !leftImage,
      }
      )}>
        <h2 className="text-center leading-snug md:text-left sm:mt-0">
          {title}
        </h2>
        <p className="text-center md:text-left">{description}</p>
      </div>
      {!leftImage && (
        <div>
          <SvgComponent className="h-64 w-64 md:h-96 md:w-96 xl:h-[600px] xl:w-[600px]" />
        </div>
      )}
    </div>
  );
}

export default Benefit;
