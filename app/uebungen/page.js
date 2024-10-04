import Link from 'next/link';

export default function ExercisesPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl mb-8">Wähle eine Übung</h1>
      <div className="space-y-4">
        <Link href="/uebungen/deutsch">
          <button className="bg-blue-500 text-white px-6 py-4 rounded-lg">
            Deutsch Übung
          </button>
        </Link>
        <Link href="/uebungen/mathematik">
          <button className="bg-green-500 text-white px-6 py-4 rounded-lg">
            Mathematik Übung
          </button>
        </Link>
      </div>
    </main>
  );
}
