import nodemailer from "nodemailer";

const email = process.env.NEXT_EMAIL;
const pass = process.env.NEXT_EMAIL_PASS;
const mail_to = process.env.NEXT_MAIL_TO;

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass: pass,
  },
});

export const mailOptions = {
  from: email,
  to: mail_to,
};
