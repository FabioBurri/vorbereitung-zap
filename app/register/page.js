'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Register</h1>

      {}
      <button 
        className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        onClick={() => signIn('google')}
      >
        {}
        <div className="bg-white p-1 rounded-full mr-2">
          <Image 
            src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
            alt="Google Logo"
            width={20}
            height={20}
          />
        </div>
        Registrieren mit Google
      </button>

      <p className="mt-4">
        Du hast bereits einen Account? Logge dich{' '}
        <Link href="/login" className="text-blue-500 hover:underline">
        hier 
        </Link>{' '}
        ein.
      </p>
    </div>
  );
}
