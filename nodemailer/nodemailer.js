import nodemailer from "nodemailer";

const email = process.env.NEXT_EMAIL;
const mail_to = process.env.NEXT_MAIL_TO;

export const transporter = nodemailer.createTransport({
	host: "smtp-relay.brevo.com",
	port: 587,
	secure: false,
	auth: {
		user: process.env.BREVO_SMTP_USER, 
		pass: process.env.BREVO_SMTP_KEY, 
	},
});

export const mailOptions = {
	from: `"${process.env.NEXT_EMAIL_NAME || "DataWiz"}" <${email}>`, 
	to: mail_to,
	replyTo: mail_to, 
};
