import { NextResponse } from "next/server";
import { mailOptions, transporter } from "../../../nodemailer/nodemailer";

export async function POST(request) {
  const { name, email, message, website } = await request.json();

  try {
    await transporter.sendMail({
      ...mailOptions,
      subject: `Message from ${email.value}`,
      html: `<h2>Message from: ${name.value}</h2><p>Message: ${message.value}</p>
	  <p>
	  Email: ${email.value}</p>
	  <p>
	  Website: ${website.value}</p>`,
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
