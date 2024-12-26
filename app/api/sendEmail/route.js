import { NextResponse } from 'next/server';
import sendEmail from '../../lib/sendEmail';

export async function POST(request) {
  try {
    const { subject, content } = await request.json();

    if (!subject || !content) {
      return NextResponse.json(
        { error: 'Betreff und Inhalt sind erforderlich.' },
        { status: 400 }
      );
    }

    const recipient = process.env.DEFAULT_RECIPIENT_EMAIL;

    if (!recipient) {
      return NextResponse.json(
        { error: 'Empfängeradresse nicht gesetzt.' },
        { status: 500 }
      );
    }

    const emailResult = await sendEmail(recipient, subject, content);

    if (emailResult.error) {
      return NextResponse.json(
        { error: 'Fehler beim Versenden der E-Mail.', details: emailResult.details },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'E-Mail erfolgreich gesendet.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Fehler beim Senden der E-Mail:', error);
    return NextResponse.json(
      { error: 'Fehler beim Senden der E-Mail.', details: error.message },
      { status: 500 }
    );
  }
}
