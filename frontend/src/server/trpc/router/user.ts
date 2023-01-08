import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const userRouter = router({
  test: publicProcedure.query(({ input }) => {
    return {
      test: `Hello test is definitely working, keen as`,
    };
  }),
});
