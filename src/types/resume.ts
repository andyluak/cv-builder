import { z } from "zod";

const EducationSchema = z.object({
  school: z.string(),
  degree: z.string(),
  fieldOfStudy: z.string(),
  from: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  to: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  current: z.boolean().optional(),
  location: z.string(),
});

const JobPointSchema = z.object({
  point: z.string(),
});

const JobSchema = z.object({
  company: z.string(),
  position: z.string(),
  location: z.string(),
  from: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  to: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  startDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  endDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  current: z.boolean().optional(),
  description: z.string(),
  jobPoints: z.array(JobPointSchema),
});

const UserInfoSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phone: z.string(),
  address: z.string(),
  position: z.string(),
});

const ResumeSchema = z.object({
  id: z.string(),
  userInfo: UserInfoSchema,
  jobs: z.array(JobSchema),
  educations: z.array(EducationSchema),
  skills: z.array(z.string()),
  profileDescriptions: z.string(),
  links: z.array(z.string()),
  template: z.string(),
  title: z.string(),
});

const SavedJobSchema = JobSchema.extend({
  id: z.string(),
});

const SavedEducationSchema = EducationSchema.extend({
  id: z.string(),
});

const SkillSchema = z.object({
  label: z.string(),
  level: z.number().optional(),
})

const SavedSkillSchema = SkillSchema.extend({
  id: z.string(),
  userId: z.string(),
  resumeId: z.string(),
});

export type ISkill = z.infer<typeof SkillSchema>;
export type ISavedSkill = z.infer<typeof SavedSkillSchema>;

export type IEducation = z.infer<typeof EducationSchema>;
export type ISavedEducation = z.infer<typeof SavedEducationSchema>;

export type IJobPoint = z.infer<typeof JobPointSchema>;

export type IJob = z.infer<typeof JobSchema>;
export type ISavedJob = z.infer<typeof SavedJobSchema>;
export type IUserInfo = z.infer<typeof UserInfoSchema>;
export type IResume = z.infer<typeof ResumeSchema>;
