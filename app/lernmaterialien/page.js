'use client';

import Image from 'next/image';

export default function LernmaterialienPage() {
  const handleDownload = (filePath, fileName) => {
    const link = document.createElement('a');
    link.href = filePath;
    link.download = fileName; // Set the desired filename here
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen">
      {/* Header Bild und Titel */}
      <div className="relative w-full h-[400px]">
        <Image
          src="/Lernen.jpg"
          alt="Lernen"
          fill={true}
          objectFit="cover"
          objectPosition="center"
          className="rounded-lg"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white drop-shadow-lg">Lernmaterialien</h1>
        </div>
      </div>

      <div className="container mx-auto p-6 mt-12">
        {/* Lead */}
        <p className="text-lg leading-relaxed mb-12">
          Auf dieser Seite findest du Lernmaterialien, die dich beim Lernen unterstützten sollen. Ob Videos, die dir bestimmte Themen erklären, oder vergangene Prüfungen aus den Vorjahren - es hat für alle etwas dabei.
        </p>

        {/* Download Mathematik */}
        <div className="mb-8">
          <h2 className="text-[#003f56] font-semibold text-2xl mb-4">Mathematik</h2>
          <ul className="list-disc pl-6">
            <li className="mb-4">
              <button onClick={() => handleDownload('/2023_mathematik_aufgaben_lg.pdf', 'Mathematikprüfung 2023.pdf')} className="text-blue-500 underline">
                Mathematikprüfung 2023 (PDF)
              </button>
            </li>
            <li className="mb-4">
              <button onClick={() => handleDownload('/2023_mathematik_loesungen_lg.pdf', 'Lösungen Mathematikprüfung 2023.pdf')} className="text-blue-500 underline">
                Lösungen Mathematikprüfung 2023 (PDF)
              </button>
            </li>
          </ul>
        </div>

        {/* Download Deutsch */}
        <div className="mb-8">
          <h2 className="text-[#003f56] font-semibold text-2xl mb-4">Deutsch</h2>
          <ul className="list-disc pl-6">
            <li className="mb-4">
              <button onClick={() => handleDownload('/2023_textblatt_lg.pdf', 'Textblatt 2023.pdf')} className="text-blue-500 underline">
                Textblatt 2023 (PDF)
              </button>
            </li>
            <li className="mb-4">
              <button onClick={() => handleDownload('/2023_sprachpruefung_lg.pdf', 'Deutschprüfung 2023.pdf')} className="text-blue-500 underline">
                Deutschprüfung 2023 (PDF)
              </button>
            </li>
            <li className="mb-4">
              <button onClick={() => handleDownload('/2023_sprachpruefung_loesung_lg.pdf', 'Lösungen Deutschprüfung 2023.pdf')} className="text-blue-500 underline">
                Lösungen Deutschprüfung 2023 (PDF)
              </button>
            </li>
          </ul>
        </div>

        {/* Erklärvideos */}
        <div className="mb-12">
          <h2 className="text-[#003f56] font-semibold text-2xl mb-4">Videos</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-6">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/m4BcNMIZj0w"
                title="YouTube Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <div className="mb-6">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/2MvyITxrU-g"
                title="YouTube Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
