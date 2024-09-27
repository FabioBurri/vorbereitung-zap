'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      {/* Header Bild */}
      <div className="relative w-full h-[600px]">
        <Image
          src="/Lernen.jpg"
          alt="Lernen"
          fill={true}
          objectFit="cover"
          objectPosition="center"
          className="rounded-lg"
        />
        {/* Titel */}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white drop-shadow-lg">Willkommen zur ZAP-Vorbereitung!</h1>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto p-12">
        <div className="max-w-4xl mx-auto">

          {/* Lead  */}
          <p className="text-lg leading-relaxed mb-6">
            Die Lernplattform soll dir helfen, dich gezielt auf die Zentrale Aufnahmeprüfung vorzubereiten.
            Egal, ob du dich auf die Fächer Mathematik oder Deutsch konzentrieren möchtest - die Plattform
            bietet dir alles, was du für eine erfolgreiche Prüfung brauchst. Registriere dich, um Zugriff auf die Website zu erhalten.
            Was dich erwartet:
          </p>

          {/* Aufzählung */}
          <ul className="space-y-4 mb-14">
          <li className="flex items-start">
              <span className="text-[#003f56] font-bold mr-3">•</span>
              <span>Ein Lernen, das Spass macht.</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#003f56] font-bold mr-3">•</span>
              <span>Teste dein Wissen in Mathematik und Deutsch mit vielfältigen Übungen und erhalte Feedback.</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#003f56] font-bold mr-3">•</span>
              <span>Komplexe Themen werden dir effizient durch anschauliche Videos erklärt.</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#003f56] font-bold mr-3">•</span>
              <span>Bereite dich realitätsnah auf die Prüfungssituation vor und steigere deine Sicherheit.</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#003f56] font-bold mr-3">•</span>
              <span>Sammle Punkte und schalte Belohnungen frei, während du lernst.</span>
            </li>
          </ul>

          {/* Button */}
          <div className="flex justify-start">
            <Link href="/register">
              <span className="bg-[#003f56] rounded hover:bg-[#004f66] transition text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all">
                Jetzt Registrieren
              </span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
