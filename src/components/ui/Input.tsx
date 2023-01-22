import cx from "clsx";
import React from "react";

type Props = {
  label?: string;
  placeholder: string;
  value: string | undefined;
  defaultValue: string | undefined;
  name: string;
  type: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  controlled?: boolean;
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
  required,
  controlled,
}: Props) {
  // when the compionent is controlled we dont't want to pass the defaultValue prop

  return (
    <div className={cx("flex flex-col gap-2", className)}>
      {label && <label htmlFor={name}>{label}</label>}
      {controlled ? (
        <input
          className={cx(
            "rounded-md border border-gray-300 p-2 text-gray-800",
            className
          )}
          type={type}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={onChange}
          required={required}
        />
      ) : (
        <input
          className={cx(
            "rounded-md border border-gray-300 p-2 text-gray-800",
            className
          )}
          type={type}
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          defaultValue={defaultValue}
          required={required}
        />
      )}
    </div>
  );
}
