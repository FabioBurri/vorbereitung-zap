'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const getErrorMessage = (error) => {
    switch (error) {
      case 'Callback':
        return 'Die Anmeldung wurde abgebrochen.';
      case 'CredentialsSignin':
        return 'Anmeldeinformationen sind ungültig.';
      default:
        return 'Ein unbekannter Fehler ist aufgetreten.';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Anmelden</h1>

      {error && (
        <div className="bg-red-500 text-white p-4 rounded mb-4">
          {getErrorMessage(error)}
        </div>
      )}

      {/* Anmelden mit Google */}
      <button 
        className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mb-4"
        onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
      >
        <div className="bg-white p-1 rounded-full mr-2">
          <Image 
            src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
            alt="Google Logo"
            width={20}
            height={20}
          />
        </div>
        Anmelden mit Google
      </button>

      {/* Anmelden mit GitHub */}
      <button 
        className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mb-4"
        onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
      >
        <div className="bg-white p-1 rounded-full mr-2">
          <Image 
            src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
            alt="Github Logo"
            width={20}
            height={20}
          />
        </div>
        Anmelden mit Github
      </button>

      {/* Anmelden mit E-Mail */}
      <button 
        className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        onClick={() => signIn('email', { callbackUrl: '/dashboard' })}
      >
        <div className="bg-white p-1 rounded-full mr-2">
          <Image 
            src="https://static.vecteezy.com/system/resources/previews/021/454/517/non_2x/email-confirmation-app-icon-email-icon-free-png.png"
            alt="E-Mail Logo"
            width={20}
            height={20}
          />
        </div>
        Anmelden mit E-Mail
      </button>

      <p className="mt-4">
        Du hast noch keinen Account? Registriere dich{' '}
        <Link href="/register" className="text-blue-500 hover:underline">
          hier
        </Link>
        .
      </p>
    </div>
  );
}
