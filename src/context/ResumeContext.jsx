import React, { useEffect } from "react";

const ResumeContext = React.createContext();

const ResumeProvider = ({ children }) => {
  const [template, setTemplate] = React.useState("Notion");
  const [userInfo, setUserInfo] = React.useState({
    firstName: "",
    lastName: "",
    position: "",
    phone: "",
    email: "",
    profileDescription: "",
  });
  const [jobExperiences, setJobExperiences] = React.useState([]);
  const [educations, setEducations] = React.useState([]);
  const [skills, setSkills] = React.useState([]);

  useEffect(() => {
    const userInfoFromLocalStorage = localStorage.getItem("userInfo");
    const jobExperiencesFromLocalStorage =
      localStorage.getItem("jobExperiences");
    const educationsFromLocalStorage = localStorage.getItem("educations");
    const templateFromLocalStorage = localStorage.getItem("template");
    const skillsFromLocalStorage = localStorage.getItem("skills");

    if (userInfoFromLocalStorage) {
      setUserInfo(JSON.parse(userInfoFromLocalStorage));
    }

    if (jobExperiencesFromLocalStorage) {
      setJobExperiences(JSON.parse(jobExperiencesFromLocalStorage));
    }

    if (educationsFromLocalStorage) {
      setEducations(JSON.parse(educationsFromLocalStorage));
    }

    if (templateFromLocalStorage) {
      setTemplate(templateFromLocalStorage);
    }

    if (skillsFromLocalStorage) {
      setSkills(JSON.parse(skillsFromLocalStorage));
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
    if (educations.length > 0) {
      localStorage.setItem("educations", JSON.stringify(educations));
    }
  }, [educations]);

  useEffect(() => {
    if (template) {
      localStorage.setItem("template", template);
    }
  }, [template]);

  useEffect(() => {
    if (skills.length > 0) {
      localStorage.setItem("skills", JSON.stringify(skills));
    }
  }, [skills]);

  const clearAllData = () => {
    localStorage.clear();
    setUserInfo({
      firstName: "",
      lastName: "",
      position: "",
      phone: "",
      email: "",
      profileDescription: "",
    });
    setJobExperiences([]);
    setEducations([]);
    setTemplate("Notion");
    setSkills([]);
  }

  const value = {
    userInfo,
    setUserInfo,
    jobExperiences,
    setJobExperiences,
    educations,
    setEducations,
    template,
    setTemplate,
    skills,
    setSkills,
    clearAllData
  };

  return (
    <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
  );
};

const useResumeContext = () => React.useContext(ResumeContext);

export { ResumeProvider, useResumeContext };
