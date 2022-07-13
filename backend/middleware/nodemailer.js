import nodemailer from "nodemailer";
import env from "dotenv";
env.config();

export const mailer = nodemailer.createTransport({
	service: "Gmail",
	secure: true,
	auth: {
		user: "torquetricking@gmail.com",
		pass: process.env.GMAIL_PASS,
	},
});
