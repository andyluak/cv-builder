import React from "react";

type Props = {
  children: React.ReactNode;
  setOpen: (open: boolean) => void;
};

export default function Modal({ children, setOpen }: Props) {
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
      <div className="w-full max-w-[600px] rounded-md bg-gray-100 p-8">
        {children}
      </div>
    </div>
  );
}
