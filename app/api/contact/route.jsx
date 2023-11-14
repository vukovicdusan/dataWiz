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

// import { mailOptions, transporter } from "../../config/nodemailer";

const handler = async (req, res) => {
	if (req.method === "POST") {
		const data = req.body;

		try {
			await transporter.sendMail({
				...mailOptions,
				subject: `Poruka od ${data.email}`,
				html: `<h2>Poruka od ${data.email}</h2><p>${data.message}</p>`,
			});
			return res.status(200).json({ success: true });
		} catch (err) {
			console.log(err);
			return res.status(400).json({ message: err.message });
		}
	}
	res.status(400).json({ message: "Bad Request" });
};

export default handler;
