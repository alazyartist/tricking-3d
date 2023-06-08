// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { sessionsummariesRouter } from "./sessionsummaries";
import { userRouter } from "./user";
import { tricksRouter } from "./trick";
import { transitionsRouter } from "./transitions";
import { comboRouter } from "./combos";
import { debateRouter } from "./debates";

export const appRouter = router({
  userDB: userRouter,
  combos: comboRouter,
  trick: tricksRouter,
  transition: transitionsRouter,
  sessionsummaries: sessionsummariesRouter,
  debates: debateRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
