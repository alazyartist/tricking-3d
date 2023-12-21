import { NextResponse } from "next/server";
import { authMiddleware } from "@clerk/nextjs";
import { jwtVerify, importJWK } from "jose";
import type { NextRequest } from "next/server";

// export default withClerkMiddleware((req: NextRequest) => {
//   return NextResponse.next();
// });
export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/webhooks/(.*)",
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
    "/social",
    "/pppoints",
    "/battlerooms(.*)",
    "/userProfile(.*)",
    "/api/trpc/ably(.*)",
    "/api/trpc/trick(.*)",
    "/api/trpc/sessionsummaries(.*)",
    "/api/trpc/animations(.*)",
    "/api/trpc/debates.findByID(.*)",
    "/api/trpc/userDB.findByUUID(.*)",
    "/api/trpc/combos(.*)",
    "/api/trpc/userDB.findAll(.*)",
    "/api/trpc/userDB.findByClerkId(.*)",
  ],
});
// Stop Middleware running on static files
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
};

// export async function middleware(request: NextRequest) {
//   // Assume a "Cookie:nextjs=fast" header to be present on the incoming request
//   // Getting cookies from the request using the `RequestCookies` API
//   // const cookie = request.cookies.get("jwt")?.value;
//   // // console.log("cooki", cookie); // => 'fast'
//   // if (cookie) {
//   //   let secret = process.env.REFRESH_TOKEN_SECRET;
//   //   let secret2 = await new TextEncoder().encode(
//   //     process.env.ACCESS_TOKEN_SECRET
//   //   );
//   //   // const token = await getToken({ req: request, secret });
//   //   const [headerB64, payloadB64, signatureB64] = cookie?.split(".");
//   //   const header = JSON.parse(atob(headerB64).toString());
//   //   const payload = JSON.parse(atob(payloadB64).toString());
//   //   const signature = atob(signatureB64);
//   //   let publicKey = await importJWK({
//   //     kty: "oct",
//   //     alg: "HS256",
//   //     k: secret,
//   //   });
//   // try {
//   //   const isValid = await jwtVerify(cookie, publicKey, {
//   //     algorithms: [header.alg],
//   //     typ: "JWT",
//   //   });
//   //   console.log("isValid", isValid);
//   // } catch (err) {
//   //   console.log(err);
//   // }
//   // console.log(cookie ? "loggedIn" : "NotLoggedIn");
//   // console.log("token", payload);
//   //   // Setting cookies on the response using the `ResponseCookies` API
//   //   const response = NextResponse.next()
//   //   response.cookies.set('vercel', 'fast')
//   //   response.cookies.set({
//   //     name: 'vercel',
//   //     value: 'fast',
//   //     path: '/test',
//   //   })
//   //   const cookie = response.cookies.get('vercel')
//   //   console.log(cookie) // => { name: 'vercel', value: 'fast', Path: '/test' }
//   //   // The outgoing response will have a `Set-Cookie:vercel=fast;path=/test` header.
//   // }
//   return NextResponse.next();
// }
