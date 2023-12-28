import "server-only";

import { cache } from "react";
import { headers } from "next/headers";
import { createTRPCClient, loggerLink, TRPCClientError } from "@trpc/client";
import { callProcedure } from "@trpc/server";
import { observable } from "@trpc/server/observable";
import type { TRPCErrorResponse } from "@trpc/server/rpc";

import { tson } from "~/lib/tson";
import { appRouter } from "~/trpc/root";
import { createTRPCContext } from "~/trpc/trpc";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(() => {
  const _headers = new Headers(headers());
  _headers.set("x-trpc-source", "rsc");
  return createTRPCContext({
    headers: _headers,
  });
});

export const trpc = createTRPCClient<typeof appRouter>({
  transformer: tson,
  links: [
    loggerLink({
      enabled: (op) =>
        process.env.NODE_ENV === "development" ||
        (op.direction === "down" && op.result instanceof Error),
    }),
    /**
     * Custom RSC link that lets us invoke procedures without using http requests. Since Server
     * Components always run on the server, we can just call the procedure as a function.
     */
    () =>
      ({ op }) =>
        observable((observer) => {
          createContext()
            .then((context) => {
              return callProcedure({
                procedures: appRouter._def.procedures,
                path: op.path,
                getRawInput: async () => op.input,
                ctx: context,
                type: op.type,
              });
            })
            .then((data) => {
              observer.next({ result: { data } });
              observer.complete();
            })
            .catch((cause: TRPCErrorResponse) => {
              observer.error(TRPCClientError.from(cause));
            });
        }),
  ],
});
