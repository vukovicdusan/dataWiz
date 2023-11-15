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
      { message: "Email Sent", success: true },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Failed To Send", success: false },
      { status: 400 }
    );
  }
}
