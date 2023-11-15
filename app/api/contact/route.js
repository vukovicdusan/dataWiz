import { NextResponse } from "next/server";
import { mailOptions, transporter } from "../../../nodemailer/nodemailer";

export async function POST(request) {
	const { name, email, message } = await request.json();
	try {
		await transporter.sendMail({
			...mailOptions,
			subject: `Poruka od ${name}`,
			html: `<h2>Poruka od ${email}</h2><p>${message}</p>`,
		});
		return NextResponse.json(
			{
				message:
					"Email Sent. Thank you for your message! I will get back to you ASAP!",
				success: true,
			},
			{ status: 200 }
		);
	} catch (err) {
		console.log(err);
		return NextResponse.json(
			{ message: "Sorry, the email has not been sent.", success: false },
			{ status: 400 }
		);
	}
}
