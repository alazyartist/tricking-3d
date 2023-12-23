import { v4 as uuid } from "uuid";
import jwt from "jsonwebtoken";

export default function GET(req, res) {
  const cid = req.query.cid;

  const apiKey = process.env.ABLY_API_KEY;
  const [keyId, keySecret] = apiKey.split(":");
  const expiresIn = 10000;
  const jwtOptions = {
    expiresIn,
    keyid: keyId,
  };
  let rnduuid = uuid();
  let clientId = rnduuid;
  if (cid !== undefined && cid !== null) {
    clientId = cid;
  }
  const jwtPayload = {
    "x-ably-capability": '{"*":["*"]}',
    "x-ably-clientId": clientId,
  };
  jwt.sign(jwtPayload, keySecret, jwtOptions, (err, tokenId) => {
    if (err) {
      console.log(err);
    }
    if (err) return console.trace();

    const stringy = JSON.stringify(tokenId);
    //send back to client
    res.status(200).send(stringy);
  });
}
