import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

import type { Settings } from "~/lib/validators";
import { settingsValidator } from "~/lib/validators";
import {
  createCallerFactory,
  createTRPCRouter,
  publicProcedure,
} from "~/trpc/trpc";

// Database
const settings: Settings = {
  name: "",
  members: [],
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
      settings.members = opts.input.members;

      return settings;
    }),
  }),
});
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);

/**
 * Inference helpers for input types
 * @example
 * type PostByIdInput = RouterInputs['post']['byId']
 *      ^? { id: number }
 **/
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helpers for output types
 * @example
 * type AllPostsOutput = RouterOutputs['post']['all']
 *      ^? Post[]
 **/
export type RouterOutputs = inferRouterOutputs<AppRouter>;
