'use client';

import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/navigation';

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
    });

    if (error) {
      setError('Fehler bei der Registrierung: ' + error.message);
    } else {
      setMessage('Registrierung erfolgreich! Bitte überprüfe dein E-Mail-Postfach.');
      router.push('/login');
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
          className="bg-[rgb(31,41,55)] text-white px-4 py-2 rounded hover:bg-[rgb(75,85,99)] transition"
        >
          Registrieren
        </button>
      </form>
    </div>
  );
}
