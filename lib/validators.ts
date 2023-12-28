import { z } from "zod";

export const settingsValidator = z.object({
  name: z.string(),
  members: z.array(z.object({ name: z.string(), role: z.string() })),
});
export type Settings = z.infer<typeof settingsValidator>;
