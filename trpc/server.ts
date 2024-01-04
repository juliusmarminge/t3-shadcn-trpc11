import "server-only";

import { cache } from "react";
import { headers } from "next/headers";

import { createCaller } from "~/trpc/root";
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

export const trpc = createCaller(createContext);
