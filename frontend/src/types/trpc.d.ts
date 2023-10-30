import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "server/trpc/router/_app";

type RouterOutput = inferRouterOutputs<AppRouter>;

export type GetAllSessionSummaries =
  RouterOutput["sessionsummaries"]["getAllSessionSummaries"];
export type FindAllUsers = RouterOutput["userDB"]["findAll"];
