const template = ({
  firstName,
  lastName,
  position,
  email,
  phone,
  jobExperiences,
  educations,
  skills,
}) => {

  

  return `
<div class="bg-gray-100 p-8 text-black">
  <div class="border border-x-0 border-t-0 border-b-gray-500 pb-2">
    <h1 class="mb-4 text-4xl font-bold">${firstName} ${lastName}</h1>
    <h2>${position}</h2>
    <p class="text-gray-800">Remote | Full-time</p>
  </div>
  <div class="mt-8 grid grid-cols-3">
    <div class="col-span-2 grid pr-12">
      <div>
        <p class="mb-2 font-bold">Bio</p>
        <p>
          I am Alex, a web developer with a passion for building and maintaining
          scalable, user-friendly websites and applications. I have a strong
          background in the latest technologies, and a talent for
          problem-solving. As a web developer, I am responsible for designing,
          building, and maintaining web-based solutions for a variety of
          clients.
        </p>
      </div>
      <div class="mt-8">
        <p class="mb-2 font-bold">Work Experience</p>
        ${jobExperiences
          ?.map(
            (jobExperience, index) => `
          <div key="${index}" class="mb-8 flex flex-col gap-4">
            <div>
              <p class="font-bold">
                ${jobExperience.position} at ${jobExperience.company}
              </p>
              <p class="text-gray-800">${jobExperience.location}</p>
            </div>
            <div>
              <p class="text-gray-700">
                ${jobExperience.startDate} - ${jobExperience.endDate}
              </p>
              <div class="bullet-points pl-4">
                <ul class="list-inside list-disc">
                  ${jobExperience.jobPoints
                    .map(
                      (jobPoint, index) => `
                  <li key="${index}">${jobPoint}</li>
                  `
                    )
                    .join("")}
                </ul>
              </div>
            </div>
          </div>`
          )
          .join("")}
      </div>
      <div class="mt-8">
        <p class="mb-2 font-bold">Education</p>
        <div class="flex flex-col gap-4">
          ${educations
            ?.map(
              (education, index) =>
                `<div key=${index} class="flex flex-col">
              <div>
                <p class="font-bold">${education.school}</p>
                <p class="text-gray-800">
                  ${education.fieldOfStudy} | ${education.degree}
                </p>
              </div>
              <div>
                <p class="text-gray-700">
                  ${education.from} - ${education.to}
                </p>
              </div>
            </div>`
            )
            .join("")}
        </div>
      </div>
    </div>
    <div>
      <div>
        <p class="mb-2 font-bold">Contact</p>
        <div class="flex flex-col">
          <p>${email || "someEmail@gmail.com"}</p>
          <p>${phone || "+1 23456789"}</p>
        </div>
      </div>
      <div class="mt-12">
        <p class="mb-2 font-bold">Skills</p>
        <div class="flex flex-col">
          ${skills
            ?.map((skill, index) => `<p key="${index}">${skill}</p>`)
            .join("")}
        </div>
      </div>
      <div class="mt-12">
        <p class="mb-2 font-bold">Languages</p>
        <div class="flex flex-col">
          <p>English</p>
          <p>Romanian</p>
        </div>
      </div>
    </div>
  </div>
</div>
`;
};

export default template;
