import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from "next/server";

//location src/app/api/send-email/route.ts
export async function POST(req: NextRequest) {
    const { recipient, subject, message } = await req.json();

    if (!recipient || !subject || !message) {
        return NextResponse.json({ error: 'Missing required fields: name, email, subject, message' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASSWORD,
        },
    });
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: recipient,
        subject: subject,
        text: message,
    };

    try {
        await transporter.sendMail(mailOptions);
        return NextResponse.json({ message: 'Email sent successfully', }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: `Failed to send email:${error.message}`, }, { status: 500 });
    }
}
