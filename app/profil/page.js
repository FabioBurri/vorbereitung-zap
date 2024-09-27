'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

   useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>Die Seite wird geladen...</div>;
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          Bitte logge dich ein, um dein Profil zu sehen.
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Profilseite</h1>
        <p className="text-lg"><strong>Name:</strong> {session.user?.name || 'Keine Angabe'}</p>
        <p className="text-lg"><strong>E-Mail:</strong> {session.user?.email || 'N/A'}</p>
      </div>
    </div>
  );
}