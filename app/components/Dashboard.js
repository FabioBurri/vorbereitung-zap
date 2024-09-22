'use client';

import { useSession } from 'next-auth/react';

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Laden...</div>;
  }

  if (status === "unauthenticated") {
    return <div>Bitte logge dich ein.</div>;
  }

  return (
    <div>
      <h1>Willkommen zurück, {session.user?.name}!</h1>
    </div>
  );
}
