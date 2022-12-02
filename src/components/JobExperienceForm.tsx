import React from "react";

type Props = {
  jobExperienceFormContent: {
    label: string;
    name: string;
    type: string;
    placeholder?: string;
  }[];
  onHandleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function JobExperienceForm({
  jobExperienceFormContent,
  onHandleSubmit,
}: Props) {
  return (
    <div className="flex flex-col gap-4 text-gray-800">
      <div className="flex flex-col gap-8">
        <form className="flex flex-col gap-4" onSubmit={onHandleSubmit}>
          {jobExperienceFormContent.map((input, index) => {
            switch (input.type) {
              case "text":
                return (
                  <div key={index} className="flex flex-col gap-2">
                    <label htmlFor={input.name}>{input.label}</label>
                    <input
                      type={input.type}
                      name={input.name}
                      id={input.name}
                      placeholder={input.placeholder}
                      className="rounded-md border-2 border-gray-800 px-4 py-2"
                    />
                  </div>
                );
              case "textarea":
                return (
                  <div key={index} className="flex flex-col gap-2">
                    <label htmlFor={input.name}>{input.label}</label>
                    <textarea
                      name={input.name}
                      id={input.name}
                      placeholder={input.placeholder}
                      className="rounded-md border-2 border-gray-800 px-4 py-2"
                    />
                  </div>
                );
              case "date":
                return (
                  <div key={index} className="flex flex-col gap-2">
                    <label htmlFor={input.name}>{input.label}</label>
                    <input
                      type={input.type}
                      name={input.name}
                      id={input.name}
                      placeholder={input.placeholder}
                      className="rounded-md border-2 border-gray-800 px-4 py-2"
                    />
                  </div>
                );
              case "checkbox":
                return (
                  <div key={index} className="flex flex-col gap-2">
                    <label htmlFor={input.name}>{input.label}</label>
                    <input
                      type={input.type}
                      name={input.name}
                      id={input.name}
                      placeholder={input.placeholder}
                      className="rounded-md border-2 border-gray-800 px-2 py-2"
                      value="true"
                    />
                  </div>
                );
              default:
                return null;
            }
          })}
          <button
            type="submit"
            className="rounded-md border-2 border-gray-800 bg-gray-200 px-4 py-2 text-gray-800"
          >
            {" "}
            Submit{" "}
          </button>
        </form>
      </div>
    </div>
  );
}
