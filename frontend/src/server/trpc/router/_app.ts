// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { authRouter } from "./auth";
import { sessionsummariesRouter } from "./sessionsummaries";
import { userRouter } from "./user";
import { tricksRouter } from "./trick";
import { transitionsRouter } from "./transitions";
import { comboRouter } from "./combos";

export const appRouter = router({
  auth: authRouter,
  userDB: userRouter,
  combos: comboRouter,
  trick: tricksRouter,
  transition: transitionsRouter,
  sessionsummaries: sessionsummariesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
