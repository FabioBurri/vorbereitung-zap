'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { supabase } from '../lib/supabaseClient';

export default function ExamPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const handleStartExam = async () => {
    if (userId) {
      const { error } = await supabase
        .from('user_exercises')
        .delete()
        .eq('user_id', userId)
        .eq('exercise_type', 'exam');

      if (error) {
        console.error('Error deleting previous answers:', error);
        return;
      }
    }

    router.push('/pruefung/start');
  };

  return (
    <div className="min-h-screen">
      {/* Header Bild und Titel */}
      <div className="relative w-full h-[400px]">
        <Image
          src="/pruefung.webp"
          alt="Prüfung"
          fill={true}
          objectFit="cover"
          objectPosition="center"
          className="rounded-lg"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white drop-shadow-lg">Prüfung</h1>
        </div>
      </div>

      <div className="container mx-auto p-6 mt-12">
        {/* Lead */}
        <p className="text-lg leading-relaxed mb-6">
          Mache dich bereit, deine Fähigkeiten auf die Probe zu stellen! In dieser Prüfung werden deine Kenntnisse und dein Verständnis der wichtigsten mathematischen Konzepte bewertet, so dass du deinen Lernfortschritt messen kannst. Ziel ist es, dein Können unter Zeitdruck auf Probe zu stellen. Am Ende der Prüfung erhältst du eine Rückmeldung, wie gut deine Antworten waren.
        </p>

        {/* Prüfungsinformationen */}
        <div className="text-lg mb-8">
          <p><strong>Mathematikprüfung</strong></p>
          <p>Dauer: Eine Stunde</p>
        </div>

        {/* Start Button */}
        <button
          onClick={handleStartExam}
          className="bg-[#003f56] text-white px-6 py-3 rounded hover:bg-[#004f66] transition"
        >
          Prüfung starten
        </button>
      </div>
    </div>
  );
}
