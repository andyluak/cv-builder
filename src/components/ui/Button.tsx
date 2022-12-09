import cx from "clsx";
import React from "react";

type Props = {
  className?: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onClick?: Function;
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary";
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset" | undefined;
};

function Button({
  className,
  onClick,
  children,
  variant = "primary",
  size = "md",
  type = "button",
}: Props) {
  return (
    <button
      className={cx(
        {
          "bg-gray-900 text-gray-300 hover:border-gray-200":
            variant === "primary",
        },
        {
          "bg-gray-300 text-gray-800 hover:border-gray-400":
            variant === "secondary",
        },
        {
          "bg-gray-100 text-gray-800 hover:border-gray-200":
            variant === "tertiary",
        },
        { "px-2 py-1 text-xs": size === "sm" },
        { "px-4 py-2 text-sm": size === "md" },
        { "px-6 py-3 text-base": size === "lg" },
        "rounded-md border border-transparent outline-none transition-all focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:ring-offset-gray-800",
        className
      )}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
