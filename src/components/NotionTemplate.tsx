import React from "react";

type Props = {
  style?: object;
  firstName: string;
  lastName: string;
  position?: string;
  address?: string;
  phone?: string;
  email?: string;
  jobExperiences?: {
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
    jobPoints: string[];
  }[];
  educations?: {
    school: string;
    degree: string;
    fieldOfStudy: string;
    from: string;
    to: string;
    description: string;
  }[];
  skills?: string[];
};

export default function NotionTemplate({
  style,
  firstName,
  lastName,
  position,
  address,
  phone,
  email,
  jobExperiences,
  educations,
  skills,
}: Props) {

  const defaultWorkExperience = [
    {
      company: "Company",
      position: "Position",
      location: "Location",
      startDate: "Start Date",
      endDate: "End Date",
      description: "Description",
      jobPoints: ["Job Point 1", "Job Point 2"]
    },
    {
      company: "Company",
      position: "Position",
      location: "Location",
      startDate: "Start Date",
      endDate: "End Date",
      description: "Description",
      jobPoints: ["Job Point 1", "Job Point 2"]
    }
  ]

  const defaultEducation = [
    {
      school: "School",
      degree: "Degree",
      fieldOfStudy: "Field of Study",
      from: "From",
      to: "To",
      description: "Description"
    },
    {
      school: "School",
      degree: "Degree",
      fieldOfStudy: "Field of Study",
      from: "From",
      to: "To",
      description: "Description"
    }
  ]

  const usableJobExperience = jobExperiences || defaultWorkExperience;
  const usableEducation = educations || defaultEducation;

  return (
    <div className={"bg-gray-100 p-8 text-black"} style={style}>
      <div className="border border-x-0 border-t-0 border-b-gray-500 pb-2">
        <h1 className="mb-4 text-4xl font-bold">{`${firstName} ${lastName}`}</h1>
        <h2>{position || "Senior Frontend Developer"}</h2>
        <p className="text-gray-800">Remote | Full-time</p>
      </div>
      <div className="mt-8 grid grid-cols-3">
        <div className="col-span-2 grid pr-12">
          <div>
            <p className="mb-2 font-bold">Bio</p>
            <p>
              I am Alex, a web developer with a passion for building and
              maintaining scalable, user-friendly websites and applications. I
              have a strong background in the latest technologies, and a talent
              for problem-solving. As a web developer, I am responsible for
              designing, building, and maintaining web-based solutions for a
              variety of clients.
            </p>
          </div>
          <div className="mt-8">
            <p className="mb-2 font-bold">Work Experience</p>
            {usableJobExperience?.map((jobExperience, index) => (
              <div key={index} className="mb-8 flex flex-col gap-4">
                <div>
                  <p className="font-bold">
                    {jobExperience.position} at {jobExperience.company}
                  </p>
                  <p className="text-gray-800">{jobExperience.location}</p>
                </div>
                <div>
                  <p className="text-gray-700">
                    {jobExperience.startDate} - {jobExperience.endDate}
                  </p>
                  <div className="bullet-points pl-4">
                    <ul className="list-inside list-disc">
                      {jobExperience.jobPoints.map((jobPoint, index) => (
                        <li key={index}>{jobPoint}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <p className="mb-2 font-bold">Education</p>
            <div className="flex flex-col gap-4">
              {usableEducation?.map((education, index) => (
                <div key={index} className="flex flex-col">
                  <div>
                    <p className="font-bold">{education.school}</p>
                    <p className="text-gray-800">
                      {education.fieldOfStudy} | {education.degree}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-700">
                      {education.from} - {education.to}{" "}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div>
            <p className="mb-2 font-bold">Contact</p>
            <div className="flex flex-col">
              <p>{email || "someEmail@gmail.com"}</p>
              <p>{phone || "+1 23456789"}</p>
            </div>
          </div>
          <div className="mt-12">
            <p className="mb-2 font-bold">Skills</p>
            <div className="flex flex-col">
              {skills?.map((skill, index) => (
                <p key={index}>{skill}</p>
              ))}
            </div>
          </div>
          <div className="mt-12">
            <p className="mb-2 font-bold">Languages</p>
            <div className="flex flex-col">
              <p>English</p>
              <p>Romanian</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
