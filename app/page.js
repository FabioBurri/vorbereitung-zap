'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>Die Seite wird geladen...</div>;
  }

  return (
    <main className="flex items-center justify-center min-h-screen p-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Willkommen auf der Startseite!</h1>
        <p className="mt-4">
          Bitte melde dich an oder registriere dich, um auf das Dashboard zuzugreifen.
        </p>
      </div>
    </main>
  );
}
