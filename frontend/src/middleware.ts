import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/home",
    "/test",
    "/login",
    "/sandbox(.*)",
    "/theory(.*)",
    "/about",
    "/contribute",
    "/leaderboard",
    "/compare(.*)",
    "/debate(.*)",
    "/learnMore",
    "/terms",
    "/social",
    "/comboMaker",
    "/tricks(.*)",
    "/combos(.*)",
    "/pppoints(.*)",
    "/battlerooms(.*)",
    "/api/trpc/battleroom(.*)",
    "/userProfile(.*)",
    "/api/trpc/trick(.*)",
    "/api/trpc/transition.getTransitions(.*)",
    "/api/trpc/debates.getAll(.*)",
    "/api/trpc/sessionsummaries(.*)",
    "/api/trpc/animations(.*)",
    "/api/trpc/debates.findByID(.*)",
    "/api/trpc/userDB.findByUUID(.*)",
    "/api/trpc/userDB.findUserImageById(.*)",
    "/api/trpc/combos(.*)",
    "/api/trpc/userDB.findAll(.*)",
    "/api/trpc/userDB.findByClerkId(.*)",
  ],
  ignoredRoutes: [
    "/api/trpc/ably(.*)",
    "/api/ablyAuth(.*)",
    "/api/webhooks/(.*)",
  ],
});
// Stop Middleware running on static files
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
};
