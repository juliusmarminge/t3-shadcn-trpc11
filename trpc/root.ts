import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

import { settingsValidator } from "~/lib/validators";
import { createTRPCRouter, publicProcedure } from "~/trpc/trpc";

// Database
const settings = {
  name: "",
  treatoes: [] as string[],
};

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  app: createTRPCRouter({
    info: publicProcedure.query(async () => {
      return settings;
    }),

    update: publicProcedure.input(settingsValidator).mutation(async (opts) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      settings.name = opts.input.name;
      settings.treatoes = opts.input.treatoes;

      return settings;
    }),
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;

export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
