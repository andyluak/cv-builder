import { z } from "zod";

const JobExperienceSchema = z.object({
  companyName: z.string(),
  position: z.string(),
  location: z.string(),
  from: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  to: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  present: z.boolean(),
  description: z.string(),
  jobPoints: z.array(z.string()),
});

export type JobExperience = z.infer<typeof JobExperienceSchema>;