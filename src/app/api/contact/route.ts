import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { name, email, message } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Missing fields" },
                { status: 400 }
            );
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "m.daniyalsaddiqui@gmail.com",
                pass: "ntuu sdrh exds gcpo",
            },
        });

        await transporter.sendMail({
            from: `"Portfolio Contact" <m.daniyalsaddiqui@gmail.com>`,
            to: "m.daniyalsaddiqui@gmail.com",
            replyTo: email,
            subject: `New message from ${name}`,
            html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #6366f1;">New message from your portfolio</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f4f4f5; padding: 15px; border-radius: 8px; border-left: 4px solid #6366f1;">
            ${message.replace(/\n/g, "<br>")}
          </div>
        </div>
      `,
        });

        return NextResponse.json({ success: true });
    } catch (err: any) {
        console.error("Email error:", err);
        return NextResponse.json(
            { error: "Email failed to send. Please try again later." },
            { status: 500 }
        );
    }
}
