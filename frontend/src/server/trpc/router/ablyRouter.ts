import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
export const ablyRouter = router({
  getAuth: publicProcedure
    .input(z.object({ client_id: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      const apiKey = process.env.ABLY_API_KEY;
      console.log("being hit");
      const [keyId, keySecret] = apiKey.split(":");
      const expiresIn = 10000;
      const jwtOptions = {
        expiresIn,
        keyid: keyId,
      };
      let rnduuid = uuid();
      const clientId = input.client_id ? input.client_id : rnduuid;
      const jwtPayload = {
        "x-ably-capability": '{"*":["*"]}',
        "x-ably-clientId": clientId,
      };
      console.log("jwtPayload", jwtPayload);
      const signed = jwt.sign(
        jwtPayload,
        keySecret,
        jwtOptions,
        (err, tokenId) => {
          console.log("JSON Web Token signed by auth server");
          if (err) {
            console.log(err);
          }
          if (err) return console.trace();

          // res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
          // res.setHeader("Content-Type", "application/json");

          // console.log("Sending signed JWT token back to client", tokenId);
          // res.send(JSON.stringify(tokenId));
          return JSON.stringify(tokenId);
        }
      );
      console.log(signed);
      return signed;
    }),
});
