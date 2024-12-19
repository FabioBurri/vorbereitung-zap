'use client';

import Image from 'next/image';

export default function LernmaterialienPage() {
  const handleDownload = (filePath, fileName) => {
    const link = document.createElement('a');
    link.href = filePath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const pdfIcon = 'https://uxwing.com/wp-content/themes/uxwing/download/file-and-folder-type/pdf-icon.png';

  return (
    <div className="min-h-screen">
      {/* Header Bild und Titel */}
      <div className="relative w-full h-[400px]">
        <Image
          src="/lernmaterialien.jpg"
          alt="Lernmaterialien"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          className="rounded-lg"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white drop-shadow-lg">Lernmaterialien</h1>
        </div>
      </div>

      <div className="container mx-auto p-6 mt-12">
        {/* Lead */}
        <p className="text-lg leading-relaxed mb-12">
        Hier findest du eine Auswahl an Lernmaterialien, die dir helfen, dich optimal auf deine Prüfungen vorzubereiten. Egal, ob du zusätzliche Übungsaufgaben suchst, vergangene Prüfungen durchgehen oder dir Themen über Videos erklären lassen möchtest – hier wirst du fündig. Nutze diese Ressourcen, um dich gezielt auf bevorstehende Herausforderungen vorzubereiten und offene Fragen zu klären.
        </p>

        {/* Download Mathematik */}
        <div className="mb-8">
          <h2 className="text-[#003f56] font-semibold text-2xl mb-4">Mathematik</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <Image
                src={pdfIcon}
                alt="PDF Icon"
                width={24}
                height={24}
                className="mr-2"
              />
              <button onClick={() => handleDownload('/2023_mathematik_aufgaben_lg.pdf', 'Mathematikprüfung 2023.pdf')} className="text-blue-500 underline">
                Mathematikprüfung 2023
              </button>
            </div>
            <div className="flex items-center">
              <Image
                src={pdfIcon}
                alt="PDF Icon"
                width={24}
                height={24}
                className="mr-2"
              />
              <button onClick={() => handleDownload('/2023_mathematik_loesungen_lg.pdf', 'Lösungen Mathematikprüfung 2023.pdf')} className="text-blue-500 underline">
                Lösungen Mathematikprüfung 2023
              </button>
            </div>
          </div>
        </div>

        {/* Download Deutsch */}
        <div className="mb-8">
          <h2 className="text-[#003f56] font-semibold text-2xl mb-4">Deutsch</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <Image
                src={pdfIcon}
                alt="PDF Icon"
                width={24}
                height={24}
                className="mr-2"
              />
              <button onClick={() => handleDownload('/2023_textblatt_lg.pdf', 'Textblatt 2023.pdf')} className="text-blue-500 underline">
                Textblatt 2023
              </button>
            </div>
            <div className="flex items-center">
              <img src={pdfIcon} alt="PDF" className="w-6 h-6 mr-2" />
              <button onClick={() => handleDownload('/2023_sprachpruefung_lg.pdf', 'Deutschprüfung 2023.pdf')} className="text-blue-500 underline">
                Deutschprüfung 2023
              </button>
            </div>
            <div className="flex items-center">
              <Image
                src={pdfIcon}
                alt="PDF Icon"
                width={24}
                height={24}
                className="mr-2"
              />
              <button onClick={() => handleDownload('/2023_sprachpruefung_loesung_lg.pdf', 'Lösungen Deutschprüfung 2023.pdf')} className="text-blue-500 underline">
                Lösungen Deutschprüfung 2023
              </button>
            </div>
          </div>
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