// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { sessionsummariesRouter } from "./sessionsummaries";
import { userRouter } from "./user";
import { tricksRouter } from "./trick";
import { transitionsRouter } from "./transitions";
import { comboRouter } from "./combos";
import { debateRouter } from "./debates";
import { animationRouter } from "./animations";

export const appRouter = router({
  userDB: userRouter,
  animations: animationRouter,
  combos: comboRouter,
  trick: tricksRouter,
  transition: transitionsRouter,
  sessionsummaries: sessionsummariesRouter,
  debates: debateRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
