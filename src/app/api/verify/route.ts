// app/api/verify/route.ts
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid or missing JSON body' },
      { status: 400 }
    );
  }

  const captchaValue = body.captchaValue;
  if (!captchaValue) {
    return NextResponse.json(
      { success: false, message: 'No captcha value provided' },
      { status: 400 }
    );
  }

  const SITE_SECRET = process.env.SITE_SECRET;
  if (!SITE_SECRET) {
    return NextResponse.json(
      { success: false, message: 'Server misconfiguration: Missing SITE_SECRET' },
      { status: 500 }
    );
  }

  try {
    const googleRes = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: SITE_SECRET,
          response: captchaValue,
        }),
      }
    );
    const data = await googleRes.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error('Error verifying reCAPTCHA:', err);
    return NextResponse.json(
      { success: false, message: 'Error verifying reCAPTCHA' },
      { status: 500 }
    );
  }
}
