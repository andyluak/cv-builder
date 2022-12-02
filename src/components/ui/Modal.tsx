import cx from "clsx";
import React from "react";

type Props = {
  children: React.ReactNode;
  setOpen: (open: boolean) => void;
  className?: string;
};

export default function Modal({ children, setOpen, className }: Props) {
  const handleClickOutside = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setOpen(false);
    }
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50"
      onClick={handleClickOutside}
    >
      <div className={cx("w-full max-w-[600px] rounded-md bg-gray-100 p-8", className)}>
        {children}
      </div>
    </div>
  );
}
