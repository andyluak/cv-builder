const template = (html) => `
<body class="p-4">
<h1 class="text-blue-700 text-4xl">{{name}}</h1>
<p><span class="font-bold">Address:</span> {{adress}}</p>
<p><span class="font-bold">Phone:</span> {{phone}}</p>
<p><span class="font-bold">Email:</span> {{email}}</p>

<section class="my-4">{{profileDescription}}</section>

<h2 class="font-bold text-blue-700 text-2xl">Experience</h2>
<div class="flex flex-col gap-4">
  ${html}
</div>
<div>
  <h2 class="font-bold text-blue-700 text-2xl">Education</h2>
  <div class="flex flex-row gap-10">
    <p><span>{{to}}</span>-<span>{{from}}</span></p>
    <div>
      <h3 class="text-xl">{{name}}</h3>
      <p class="italic">{{speciality}}</p>
    </div>
  </div>
</div>
<div>
  <h2 class="font-bold text-blue-700 text-2xl">Skills</h2>
  <ul class="flex flex-col ml-[133px]">
    <li>{{skill}}</li>
    <li>{{skill}}</li>
    <li>{{skill}}</li>
    <li>{{skill}}</li>
    <li>{{skill}}</li>
  </ul>
</div>
</body>
`;

export default template;
