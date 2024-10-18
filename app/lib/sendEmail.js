export async function sendEmail(recipient, subject, content) {
    const BREVO_API_KEY = process.env.NEXT_PUBLIC_BREVO_API_KEY;
  
    if (!BREVO_API_KEY) {
      console.error('API Key not found in environment variables');
      return {
        error: 'API Key not found',
        details: 'Ensure that BREVO_API_KEY is set in the .env.local file.',
      };
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
        console.error('Error sending email:', errorData);
        return { error: 'Email sending failed', details: errorData };
      }
  
      const responseData = await response.json();
      console.log('Email sent successfully:', responseData);
      return { success: true, data: responseData };
    } catch (error) {
      console.error('Unexpected error while sending email:', error);
      return { error: 'Unexpected error', details: error.message };
    }
  }
  