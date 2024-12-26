
export default async function sendEmail(recipient, subject, content) {
  const BREVO_API_KEY = process.env.BREVO_API_KEY;

  if (!BREVO_API_KEY) {
    console.error('API Key nicht in den Umgebungsvariablen gefunden.');
    throw new Error('API Key nicht gefunden. Stellen Sie sicher, dass BREVO_API_KEY in der .env.local-Datei gesetzt ist.');
  }

  const emailData = {
    sender: { email: 'fabio.burri@hotmail.com', name: 'ZAP-Vorbereitung' },
    to: [{ email: recipient }],
    subject: subject,
    htmlContent: `<html><body>${content}</body></html>`,
  };

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Fehler beim Versenden der E-Mail:', errorData);
      throw new Error('E-Mail-Versand fehlgeschlagen.');
    }

    const responseData = await response.json();
    console.log('E-Mail erfolgreich gesendet:', responseData);
    return { success: true, data: responseData };
  } catch (error) {
    console.error('Unerwarteter Fehler beim Versenden der E-Mail:', error);
    throw new Error('Unerwarteter Fehler beim E-Mail-Versand.');
  }
}
