import cx from "clsx";
import React, { useRef } from "react";

type Props = {
  label: string;
  placeholder: string;
  name: string;
  value: string | undefined;
  defaultValue?: string;
  className?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const Textarea = ({
  label,
  placeholder,
  name,
  value,
  defaultValue,
  className,
  required,
  onChange,
}: Props) => {
  const textareaRef = useRef(null);

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { scrollHeight } = e.target;

    if (!textareaRef.current) return;

    if (scrollHeight > 100) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      textareaRef.current.style.height = `${scrollHeight}px`;
    }

    // if the user deletes all the text, reset the height to the default
    if (e.target.value === "") {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      textareaRef.current.style.height = "100px";
    }

    if (typeof onChange === "function") {
      onChange(e);
    }
  };

  return (
    <div className={cx("flex flex-col", className)}>
      <label htmlFor={name}>{label}</label>
      <textarea
        className={cx(
          "min-h-[150px] overflow-y-hidden rounded-md border border-gray-300 p-2 text-gray-800",
          className
        )}
        placeholder={placeholder}
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={handleTextAreaChange}
        ref={textareaRef}
        required={required}
      />
    </div>
  );
};

export default Textarea;
