// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { authRouter } from "./auth";
import { sessionsummariesRouter } from "./sessionsummaries";
import { userRouter } from "./user";

export const appRouter = router({
  auth: authRouter,
  userDB: userRouter,
  sessionsummaries: sessionsummariesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
