import React from "react";

type Props = {
  stepsContent: Array<{
    title: string;
    form?: Array<{
      label: string;
      name: string;
      type: string;
      placeholder?: string;
    }>;
    component?: React.ReactNode;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  }>;
};

export default function MultiStepForm({ stepsContent }: Props) {
  const [currentStep, setCurrentStep] = React.useState(0);
  const step = stepsContent[currentStep];

  return (
    <div className="flex min-h-[500px] flex-col justify-between gap-4 bg-gray-200 p-4 text-gray-800">
      <div className="flex flex-col gap-16">
        {step && step.title && <h2 className="text-2xl">{step.title}</h2>}
        {step && step.form && (
          <form className="flex flex-col gap-4" onSubmit={(e)=>{
            step.onSubmit && step.onSubmit(e);
            setCurrentStep(currentStep + 1);
            }}>
            {step.form.map((input) => (
              <div key={input.name} className="flex flex-col gap-2">
                <label htmlFor={input.name}>{input.label}</label>
                <input
                  type={input.type}
                  name={input.name}
                  id={input.name}
                  placeholder={input.placeholder}
                  className="rounded-md border-2 border-gray-800 px-4 py-2"
                />
              </div>
            ))}
            <div className="flex justify-between">
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={() => console.log("subnut")}
                  className="rounded-md border-2 border-gray-800 bg-gray-200 px-4 py-2 text-gray-800"
                >
                  Previous
                </button>
              )}

              {currentStep < stepsContent.length - 1 && (
                <button
                  type="submit"
                  className="rounded-md border-2 border-gray-800 bg-gray-200 px-4 py-2 text-gray-800"
                >
                  Next
                </button>
              )}
            </div>
          </form>
        )}
        {step && step.component && (
          <>
            {step.component}
            <div className="flex justify-between">
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="rounded-md border-2 border-gray-800 bg-gray-200 px-4 py-2 text-gray-800"
                >
                  Previous
                </button>
              )}

              {currentStep < stepsContent.length - 1 && (
                <button
                  type="button"
                  onClick={() => console.log("submit")}
                  className="rounded-md border-2 border-gray-800 bg-gray-200 px-4 py-2 text-gray-800"
                >
                  Next
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
