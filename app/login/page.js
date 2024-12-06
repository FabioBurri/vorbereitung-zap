'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
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
      <form className="flex flex-col w-80" onSubmit={handleLogin}>
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
          className="bg-[#003f56] text-white px-4 py-2 rounded hover:bg-[#004f66] transition"
          disabled={loading}
        >
          {loading ? 'Anmelden...' : 'Anmelden mit E-Mail'}
        </button>
      </form>

      <p className="mt-4">
        Du hast noch keinen Account? Registriere dich{' '}
        <Link href="/register" className="text-blue-500 hover:underline">
          hier
        </Link>
        {' '}ein.
      </p>
    </div>
  );
}
