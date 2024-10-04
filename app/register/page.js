'use client';

import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
      },
    });

    if (error) {
      setError('Fehler bei der Registrierung: ' + error.message);
    } else {
      setMessage('Registrierung erfolgreich! Bitte überprüfe dein E-Mail-Postfach.');

      setTimeout(() => {
        router.push('/login');
      }, 3000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Registrieren</h1>

      {error && (
        <div className="bg-red-500 text-white p-4 rounded mb-4">
          {error}
        </div>
      )}
      {message && (
        <div className="bg-green-500 text-white p-4 rounded mb-4">
          {message}
        </div>
      )}

      <form className="flex flex-col w-80" onSubmit={handleRegister}>
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
        >
          Registrieren
        </button>
      </form>

      <p className="mt-4">
        Du hast bereits einen Account? Logge dich{' '}
        <Link href="/login" className="text-blue-500 hover:underline">
          hier
        </Link>
        {' '}ein.
      </p>
    </div>
  );
}
