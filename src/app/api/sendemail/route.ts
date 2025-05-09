import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface EmailRequestBody {
  from: string; // Sender's email address (e.g., user@example.com)
  to: string;   // Recipient's email address
  subject: string;
  body: string; // HTML content for the email
}

export async function POST(request: NextRequest) {
  try {
    // Check for environment variable configuration
    if (
      !process.env.EMAIL_HOST ||
      !process.env.EMAIL_PORT ||
      !process.env.EMAIL_USER ||
      !process.env.EMAIL_PASS
    ) {
      console.error(
        'Email service is not configured. Please set EMAIL_HOST, EMAIL_PORT, EMAIL_USER, and EMAIL_PASS environment variables.'
      );
      return NextResponse.json(
        { message: 'Email service is not configured on the server.' },
        { status: 503 } // Service Unavailable
      );
    }

    let { subject, body }: EmailRequestBody = await request.json();

    if (!subject || !body) {
      return NextResponse.json(
        { message: 'Missing required fields: subject, body' },
        { status: 400 }
      );
    }
    
    body = `
      <h1>${subject}</h1>
      <br />
      ${body}
    `;
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: Number(process.env.EMAIL_PORT) === 465, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // SMTP username from .env
        pass: process.env.EMAIL_PASS, // SMTP password from .env
      },
      // It's good practice to add a timeout
      connectionTimeout: 5000, // 5 seconds
      greetingTimeout: 5000, // 5 seconds
      socketTimeout: 5000, // 5 seconds
    });

    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender address from request body
      to: process.env.EMAIL_USER, // List of receivers from request body
      subject: subject, // Subject line from request body
      html: body, // HTML body from request body
    };

    // Verify transporter configuration (optional, good for debugging)
    // await transporter.verify(); // Uncomment to verify during development

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });

  } catch (error) {
    console.error('Error sending email:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    // Avoid exposing detailed internal errors to the client in production
    return NextResponse.json(
      { message: 'Failed to send email.', error: process.env.NODE_ENV === 'development' ? errorMessage : 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
