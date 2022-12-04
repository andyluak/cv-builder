import cx from "clsx";
import React from "react";

type Props = {
  label?: string;
  placeholder: string;
  value: string;
  defaultValue?: string;
  name: string;
  type: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({
  label,
  placeholder,
  value,
  defaultValue,
  name,
  type,
  className,
  onChange,
}: Props) {
  return (
    <div className={cx("flex flex-col gap-2")}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        className={cx("rounded-md border border-gray-300 p-2 text-gray-800", className)}
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        defaultValue={defaultValue}
      />
    </div>
  );
}
