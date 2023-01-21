import cx from "clsx";
import React from "react";

import Input from "src/components/ui/Input";

type Props = {
  className?: string;
  value?: string;
  onChange?: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | {
          target: { name: string; value: string };
        }
  ) => void;
};

function PositionSuggestion({ className, value, onChange }: Props) {
  const [isActive, setIsActive] = React.useState(false);
  const [suggestions, setSuggestions] = React.useState([]);
  const [inputValue, setInputValue] = React.useState(value || "");
  const firstLetterUppercase = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const onSuggestionChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue(value);
    onChange && onChange(e);
    setIsActive(true);
    if (value.length >= 2) {
      try {
        const res = await fetch("/api/resume/get-suggestions-ocupations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            occupationPart: value,
          }),
        });

        if (!res.ok) {
          throw new Error("Something went wrong");
        }

        const suggestions = await res.json();
        setSuggestions(suggestions);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const selectSuggestion = (suggestion: string) => {
    setInputValue(firstLetterUppercase(suggestion));
    onChange &&
      onChange({
        target: {
          name: "position",
          value: firstLetterUppercase(suggestion),
        },
      });
    setIsActive(false);
    setSuggestions([]);
  };

  return (
    <div className={cx(className)}>
      <div className="search-input relative rounded-md">
        <Input
          type="text"
          name="position"
          placeholder="Type to search..."
          onChange={onSuggestionChange}
          value={inputValue}
          className={cx("w-full shadow-sm", {
            "[border-radius:5px_5px_0_0]": isActive,
          })}
          defaultValue={inputValue}
          label="Position"
        />
        <div
          className={cx(
            "autocom-box top-18 pointer-events-none absolute left-0 max-h-[280px] w-full overflow-y-auto bg-primary p-0 opacity-0",
            {
              "pointer-events-auto p-3 opacity-100": isActive,
            }
          )}
        >
          {isActive && (
            <ul>
              {suggestions.length !== 0 && (
                <>
                  {suggestions.map((suggestion, index) => {
                    return (
                      <li
                        tabIndex={0}
                        className={cx(
                          "w-full cursor-pointer rounded-sm p-3 hover:bg-slate-100",
                          {
                            block: isActive,
                            hidden: !isActive,
                          }
                        )}
                        key={index}
                        onClick={() => selectSuggestion(suggestion)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            selectSuggestion(suggestion);
                          }

                          // on arrows up and down navigate through suggestions
                          if (e.key === "ArrowDown") {
                            e.preventDefault();
                            const nextSibling = e.currentTarget.nextSibling;
                            if (nextSibling) {
                              (nextSibling as HTMLElement).focus();
                            }
                          }

                          if (e.key === "ArrowUp") {
                            e.preventDefault();
                            const previousSibling =
                              e.currentTarget.previousSibling;
                            if (previousSibling) {
                              (previousSibling as HTMLElement).focus();
                            }
                          }
                        }}
                      >
                        {firstLetterUppercase(suggestion)}
                      </li>
                    );
                  })}
                </>
              )}
            </ul>
          )}
        </div>
        <div className="icon">
          <i className="fas fa-search"></i>
        </div>
      </div>
    </div>
  );
}

export default PositionSuggestion;
