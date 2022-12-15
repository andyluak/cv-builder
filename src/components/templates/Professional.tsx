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

function Professional({
  style,
  firstName = "John",
  lastName = "Doe",
  position = "Your Job",
  address = "Remote",
  phone = "012345678",
  email = "myEmail@gmail.com",
  jobExperiences = [
    {
      company: "Company",
      position: "Position",
      location: "Location",
      startDate: "Start Date",
      endDate: "End Date",
      description: "Description",
      jobPoints: ["Job Point 1", "Job Point 2"],
    },
    {
      company: "Company",
      position: "Position",
      location: "Location",
      startDate: "Start Date",
      endDate: "End Date",
      description: "Description",
      jobPoints: ["Job Point 1", "Job Point 2"],
    },
  ],
  educations = [
    {
      school: "School",
      degree: "Degree",
      fieldOfStudy: "Field of Study",
      from: "From",
      to: "To",
      description: "Description",
    },
  ],
  skills = ["Skill 1", "Skill 2", "Skill 3"],
}: Props) {
  return (
    <div
      className="bg-gradient-to-b from-indigo-50 to-white text-black"
      style={style}
    >
      <div className="grid grid-cols-6 gap-10 px-10 py-4">
        <div className="col-span-6">
          <div className="flex flex-col gap-8">
            <div className="adress-information flex flex-col text-gray-500">
              <p>{address}</p>
              <p>
                <span className="mr-4">{phone}</span>
                <span>{email}</span>
              </p>
            </div>
            <div className="user-info flex flex-col gap-2">
              <h1 className="text-2xl font-bold">
                {firstName} {lastName}, {position}
              </h1>
              <p>
                Experienced Web Developer , passionate about
                programming.Knowledgeable in React , being able to build
                efficient and reusable front end components, testing, and
                debugging processes. Bringing forth expertise in design,
                installation, testing and maintenance of web systems. Equipped
                with a diverse and promising skill-set. Proficient in an
                assortment of technologies, including React. Able to effectively
                self-manage during independent projects, as well as collaborate
                in a team setting.
              </p>
            </div>
          </div>
        </div>
        <div className="section col-span-1">
          <h2 className="text-gray-500">Skills</h2>
        </div>
        <div className="skills col-span-5">
          <ul className="grid grid-cols-3 flex-wrap gap-4 font-bold">
            {skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
        <div className="section col-span-1">
          <h2 className="mt-[2px] text-gray-500">Employment History</h2>
        </div>
        <div className="employment-history col-span-5 flex flex-col gap-8">
          {jobExperiences.map(
            (
              {
                position,
                company,
                location,
                startDate,
                endDate,
                jobPoints,
                description,
              },
              index
            ) => (
              <div key={index} className="job flex flex-col gap-4">
                <div className="flex flex-col">
                  <h3 className="text-xl font-bold">
                    {position} at {company}, {location}
                  </h3>
                  <p className="text-gray-500">
                    {startDate} - {endDate}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-bold">{description}</p>
                  <ul className="list-inside list-disc text-gray-800">
                    {jobPoints.map((jobPoint, index) => (
                      <li key={index}>{jobPoint}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          )}
        </div>
        <div className="section col-span-1">
          <h2 className="mt-[2px] text-gray-500">Education</h2>
        </div>
        <div className="education col-span-5">
          {educations.map(
            (
              { school, degree, fieldOfStudy, from, to, description },
              index
            ) => (
              <div key={index} className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <h3 className="text-xl font-bold">
                    {degree} in {fieldOfStudy}
                  </h3>
                  <p className="text-gray-500">
                    {from} - {to}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-bold">{school}</p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Professional;
