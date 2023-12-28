import { z } from "zod";

export const settingsValidator = z.object({
  name: z.string(),
  treatoes: z.string().array(),
});
