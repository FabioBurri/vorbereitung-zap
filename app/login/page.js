'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const getErrorMessage = (error) => {
    switch (error) {
      case 'Callback':
        return 'Die Anmeldung wurde abgebrochen.';
      case 'CredentialsSignin':
        return 'Anmeldeinformationen sind ungültig.';
      case 'InvalidCredentials':
        return 'Ungültige E-Mail oder Passwort.';
      default:
        return 'Ein unbekannter Fehler ist aufgetreten.';
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      router.push('/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Anmelden</h1>

      {error && (
        <div className="bg-red-500 text-white p-4 rounded mb-4">
          {getErrorMessage(error)}
        </div>
      )}

      {/* E-Mail Login */}
      <form className="flex flex-col w-80 mb-4" onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-Mail-Adresse"
          className="mb-4 px-4 py-2 border rounded"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Passwort"
          className="mb-4 px-4 py-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-[rgb(31,41,55)] text-white px-4 py-2 rounded hover:bg-[rgb(75,85,99)] transition"
          disabled={loading}
        >
          {loading ? 'Anmelden...' : 'Anmelden mit E-Mail'}
        </button>
      </form>

      {/* Login mit Google */}
      <button 
        className="flex items-center bg-[rgb(31,41,55)] text-white px-4 py-2 rounded hover:bg-[rgb(75,85,99)] transition mb-4"
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

      {/* Login mit GitHub */}
      <button 
        className="flex items-center bg-[rgb(31,41,55)] text-white px-4 py-2 rounded hover:bg-[rgb(75,85,99)] transition mb-4"
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
