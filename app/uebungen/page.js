'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function UebungenPage() {
  const router = useRouter();

  const handleNavigate = (path) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Obere Seite Mathematik */}
      <div 
        className="relative group cursor-pointer flex-1 overflow-hidden"
        onClick={() => handleNavigate('/uebungen/mathematik')}
      >
        <Image
          src="https://i0.wp.com/calmatters.org/wp-content/uploads/2021/08/math-curriculum.jpg?fit=2000%2C1500&ssl=1" 
          alt="Mathematik"
          fill={true}
          objectFit="cover"
          className="transition-transform duration-300 ease-in-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-300 ease-in-out group-hover:bg-opacity-60">
          <h2 className="text-5xl text-white font-bold">Mathematik</h2>
        </div>
      </div>

      {/* Untere Seite Deutsch */}
      <div 
        className="relative group cursor-pointer flex-1 overflow-hidden"
        onClick={() => handleNavigate('/uebungen/deutsch')}
      >
        <Image
          src="https://kw.uni-paderborn.de/fileadmin-kw/_processed_/5/9/csm_Aktivitaeten_56734d4f8e.jpeg"
          alt="Deutsch"
          fill={true}
          objectFit="cover"
          className="transition-transform duration-300 ease-in-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-300 ease-in-out group-hover:bg-opacity-60">
          <h2 className="text-5xl text-white font-bold">Deutsch</h2>
        </div>
      </div>
    </div>
  );
}
