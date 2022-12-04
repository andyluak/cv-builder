import React, { useEffect } from "react";

const ResumeContext = React.createContext();

const ResumeProvider = ({ children }) => {
  const [template, setTemplate] = React.useState("default");
  const [userInfo, setUserInfo] = React.useState({
    firstName: "",
    lastName: "",
  });
  const [jobExperiences, setJobExperiences] = React.useState([]);
  const [education, setEducation] = React.useState([]);

  useEffect(() => {
    const userInfoFromLocalStorage = localStorage.getItem("userInfo");
    const jobExperiencesFromLocalStorage =
      localStorage.getItem("jobExperiences");
    const educationFromLocalStorage = localStorage.getItem("education");
    const templateFromLocalStorage = localStorage.getItem("template");

    if (userInfoFromLocalStorage) {
      setUserInfo(JSON.parse(userInfoFromLocalStorage));
    }

    if (jobExperiencesFromLocalStorage) {
      setJobExperiences(JSON.parse(jobExperiencesFromLocalStorage));
    }

    if (educationFromLocalStorage) {
      setEducation(JSON.parse(educationFromLocalStorage));
    }

    if (templateFromLocalStorage) {
      setTemplate(templateFromLocalStorage);
    }
  }, []);

  useEffect(() => {
    if (userInfo.firstName && userInfo.lastName) {
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    }
  }, [userInfo]);

  useEffect(() => {
    if (jobExperiences.length > 0) {
      localStorage.setItem("jobExperiences", JSON.stringify(jobExperiences));
    }
  }, [jobExperiences]);

  useEffect(() => {
    if (education.length > 0) {
      localStorage.setItem("education", JSON.stringify(education));
    }
  }, [education]);

  useEffect(() => {
    if (template) {
      localStorage.setItem("template", template);
    }
  }, [template]);

  const value = {
    userInfo,
    setUserInfo,
    jobExperiences,
    setJobExperiences,
    education,
    setEducation,
    template,
    setTemplate,
  };

  return (
    <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
  );
};

const useResumeContext = () => React.useContext(ResumeContext);

export { ResumeProvider, useResumeContext };
