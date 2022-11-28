import cx from "clsx";
import React from "react";

function Section({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <section className={cx('p-4 md:p-8 lg:p-12', className)}>{children}</section>;
}

export default Section;
