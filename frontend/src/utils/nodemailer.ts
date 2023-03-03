import nodemailer from "nodemailer";
import { env } from "../env/server.mjs";
import { google } from "googleapis";
import { Theme } from "next-auth";
import { EmailConfig } from "next-auth/providers/email.js";
const OAuth2 = google.auth.OAuth2;

const myOAuth2Client = new OAuth2(
  env.GMAIL_CLIENT_ID,
  env.GMAIL_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);
myOAuth2Client.setCredentials({
  refresh_token: env.GMAIL_REFRESH_TOKEN,
});
export const myAccessToken: any = async () => {
  const { token } = await myOAuth2Client.getAccessToken();
  console.log("token", token);
  return token;
};
const accessToken = myAccessToken();
console.log("accesstoken", accessToken);
export const mailer = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: "torquetricking@gmail.com",
    clientId: env.GMAIL_CLIENT_ID,
    clientSecret: env.GMAIL_CLIENT_SECRET,
    refreshToken: env.GMAIL_REFRESH_TOKEN,
    accessToken: accessToken,
  },
});
interface Params {
  identifier: string;
  url: string;
  provider: EmailConfig;
  theme?: Theme;
}

export async function sendVerificationRequest(params: Params) {
  const { identifier, url, provider, theme } = params;
  const { host } = new URL(url);

  const result = await mailer.sendMail({
    to: identifier,
    from: provider.from,
    subject: `Sign in to ${host}`,
    text: text({ url, host }),
    html: html({ url, host, theme }),
  });
  const failed = result.rejected.concat(result.pending).filter(Boolean);
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
  }
}

/**
 * Email HTML body
 * Insert invisible space into domains from being turned into a hyperlink by email
 * clients like Outlook and Apple mail, as this is confusing because it seems
 * like they are supposed to click on it to sign in.
 *
 * @note We don't add the email address to avoid needing to escape it, if you do, remember to sanitize it!
 */
function html(params: { url: string; host: string; theme?: Theme }) {
  const { url, host, theme } = params;

  const escapedHost = host.replace(/\./g, "&#8203;.");

  const brandColor = theme?.brandColor || "#06b6d4";
  const color = {
    background: "#f9f9f9",
    text: "#444",
    mainBackground: "#fff",
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: theme?.buttonText || "#fff",
  };
  //TODO clean up email login design
  return `
<body style="background: ${color.background};">
  <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center"
        style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        Sign in to the <strong>Trickedex</strong>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${url}"
                target="_blank"
                style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">Sign
                in</a></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        If you did not request this email you can safely ignore it.
      </td>
    </tr>
  </table>
</body>
`;
}

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`;
}
