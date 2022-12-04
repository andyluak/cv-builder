import React from "react";

const ResumeContext = React.createContext({});

type ResumeContextProps = {
  children: React.ReactNode;
};

const ResumeProvider = ({ children }: ResumeContextProps) => {
  const [userInfo, setUserInfo] = React.useState({});
  const [jobExperiences, setJobExperiences] = React.useState([]);
  const [education, setEducation] = React.useState([]);

  const value = {
    userInfo,
    setUserInfo,
    jobExperiences,
    setJobExperiences,
    education,
    setEducation,
  };

  return (
    <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
  );
};

const useResumeContext = () => React.useContext(ResumeContext);

export { ResumeProvider, useResumeContext };
