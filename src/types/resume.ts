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

export type IEducation = z.infer<typeof EducationSchema>;
export type IJobPoint = z.infer<typeof JobPointSchema>;
export type IJob = z.infer<typeof JobSchema>;
