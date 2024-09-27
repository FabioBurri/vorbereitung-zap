'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  console.log('Session data:', session);
  console.log('Session status:', status);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>Die Seite wird geladen...</div>;
  }

  if (!session) {
    return <div>Bitte logge dich ein.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <p className="font-bold mb-4">Willkommen zurück, {session.user?.email || 'User'}!</p>
      <p className="text-lg">Hier ist dein Dashboard.</p>
    </div>
  );
}
