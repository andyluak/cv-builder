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
  const contactInformation = `
  <div class="adress-information flex flex-col text-gray-500">
    <p>Romania | Sibiu</p>
    <p>
      <span class="mr-4">${phone}</span>
      <span>${email}</span>
    </p>
  </div>
  `;

  const userInfo = `
    <div class="user-info flex flex-col gap-2">
      <h1 class="text-2xl font-bold">
        ${firstName} ${lastName}, ${position}
      </h1>
      <p>
        Experienced Web Developer , passionate about programming.Knowledgeable in React , being able to build efficient and reusable front end components, testing, and debugging processes. Bringing forth expertise in design, installation, testing and maintenance of web systems. Equipped with a diverse and promising
        skill-set. Proficient in an assortment of technologies, including
        React. Able to effectively self-manage during independent
        projects, as well as collaborate in a team setting.
      </p>
    </div>
  `;

  const skillsList = `
    <div class="skills col-span-5">
      <ul class="gap-4 flex-wrap font-bold grid grid-cols-3">
        ${skills.map((skill) => `<li>${skill}</li>`).join("")}
      </ul>
    </div>
  `;

  const employmentHistory = `
  <div class="employment-history col-span-5 flex flex-col gap-8">
    
    ${jobExperiences
      .map(
        ({
          position,
          company,
          location,
          startDate,
          endDate,
          jobPoints,
          description,
        }) => `
    <div class="job flex flex-col gap-4">
      <div class="flex flex-col">
        <h3 class="font-bold text-xl">
          ${position} at ${company}, ${location}
        </h3>
        <p class="text-gray-500">${startDate} - ${endDate}</p>
      </div>
      <div class="flex flex-col gap-2">
        <p class="font-bold">
          ${description}
        </p>
        <ul class="list-inside list-disc text-gray-800">
          ${jobPoints.map((jobPoint) => `<li>${jobPoint}</li>`).join("")} 
        </ul>
      </div>
    </div>`
      )
      .join("")}
  </div>
  `;

  const education = `
  <div class="education col-span-5 flex flex-col gap-4">
    ${educations
      .map(
        ({ degree, school, fieldOfStudy, from, to }) => `
    <div class="flex flex-col gap-4">
      <div class="flex flex-col">
        <h3 class="font-bold text-xl">
          ${degree} in ${fieldOfStudy}
        </h3>
        <p class="text-gray-500">${from} - ${to}</p>
      </div>
      <div class="flex flex-col gap-2">
        <p class="font-bold">
          ${school}
        </p>
      </div>
    </div>
    `
      )
      .join("")}
  </div>`;

  return `<body class="bg-gradient-to-b from-indigo-200 to-white">
  <div class="grid grid-cols-6 gap-10 px-10 py-4 bg-indigo-600">
    <div class="col-span-6">
      <div class="flex flex-col gap-8">
        ${contactInformation}
        ${userInfo}
      </div>
    </div>
    <div class="section col-span-1">
      <h2 class="text-gray-500">Skills</h2>
    </div>
    ${skillsList}
    <div class="section col-span-1">
      <h2 class="text-gray-500 mt-[2px]">Employment History</h2>
    </div>
    ${employmentHistory}
    <div class="section col-span-1">
      <h2 class="text-gray-500 mt-[2px]">Education</h2>
    </div>
    ${education}
  </div>
</body>`;
};

export default template;
