'use client'

import { useState, useEffect } from 'react';
import exercises from '../../data/mathematik_exercises.json';
import { InlineMath } from 'react-katex';
import Image from 'next/image';

// Reisetabelle für Aufgabe 2
const TravelTable = () => {
  return (
    <table className="min-w-full border-collapse border border-black text-center mb-6">
      <thead>
        <tr className="bg-[#003f56]">
          <th colSpan="2" className="border border-black p-2 text-white">Zürich – Paris</th>
          <th colSpan="2" className="border border-black p-2 text-white">Zürich – Brüssel</th>
        </tr>
        <tr>
          <th className="border border-black p-2">Distanz</th>
          <th className="border border-black p-2">Reisezeit</th>
          <th className="border border-black p-2">Distanz</th>
          <th className="border border-black p-2">Reisezeit</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border border-black p-2">488 km</td>
          <td className="border border-black p-2">x</td>
          <td className="border border-black p-2">493 km</td>
          <td className="border border-black p-2">x</td>
        </tr>
        <tr>
          <td className="border border-black p-2">490 km</td>
          <td className="border border-black p-2">1 h 15 min</td>
          <td className="border border-black p-2">500 km</td>
          <td className="border border-black p-2">1 h 15 min</td>
        </tr>
        <tr>
          <td className="border border-black p-2">575 km</td>
          <td className="border border-black p-2">4 h 10 min</td>
          <td className="border border-black p-2">848 km</td>
          <td className="border border-black p-2">6 h 50 min</td>
        </tr>
        <tr>
          <td className="border border-black p-2">640 km</td>
          <td className="border border-black p-2">6 h 40 min</td>
          <td className="border border-black p-2">632 km</td>
          <td className="border border-black p-2">7 h 15 min</td>
        </tr>
      </tbody>
    </table>
  );
};

export default function MathematikPage() {
  const [userAnswers, setUserAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [results, setResults] = useState({});
  const [showHint, setShowHint] = useState({});

  const handleInputChange = (e, id) => {
    setUserAnswers({
      ...userAnswers,
      [id]: e.target.value,
    });
  };

  const handleCheckAnswers = () => {
    const currentResults = {};
    exercises.uebungen.mathematik.aufgaben.forEach((aufgabe) => {
      aufgabe.tasks.forEach((task) => {
        currentResults[task.id] = userAnswers[task.id] === task.solution;
      });
    });
    setResults(currentResults);
    setChecked(true);
  };

  const formatQuestion = (question) => {
    return question.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  };

  const handleToggleHint = (id) => {
    setShowHint((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .katex-html {
        display: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Buchstaben zur Aufzählung der Unteraufgaben
  const letters = ['a', 'b', 'c', 'd', 'e', 'f'];

  return (
    <div className="min-h-screen">
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
          <h1 className="text-5xl font-bold text-white drop-shadow-lg">Übungen Mathematik</h1>
        </div>
      </div>

      <div className="container mx-auto p-6 mt-8">
        {exercises.uebungen.mathematik.aufgaben.map((aufgabe, aufgabeIndex) => (
          <div key={aufgabe.id} className="mb-10">
            {/* Titel */}
            <h2 className="text-[#003f56] font-semibold mb-4" style={{ fontSize: '18px' }}>
              {aufgabe.title}
            </h2>

            {/* Untertitel */}
            {aufgabe.subtitle && (
              <p className="text-black text-base mb-4" style={{ fontSize: '18px' }}>
                {aufgabe.subtitle}
              </p>
            )}

            {/* Rendert die Tabelle */}
            {aufgabe.table && <TravelTable />}

            {/* Rendert alle Aufgaben */}
            {aufgabe.tasks.map((task, taskIndex) => (
              <div key={task.id} className="mb-6">
                {/* Render die Fragen mit den Buchstaben (a, b, c...) */}
                <p className="text-black text-base mb-2" style={{ fontSize: '18px' }}>
                  {letters[taskIndex]}) {task.question && formatQuestion(task.question)}
                </p>

                {/* Rendert die Mathematik-Formeln unabhängig */}
                {task.formula && (
                  <p className="text-black text-base mb-2" style={{ fontSize: '18px' }}>
                    <InlineMath math={task.formula} />
                  </p>
                )}

                <div className="flex items-center mb-2">
                  {/* Inputfeld mit halber Breite */}
                  <input
                    type="text"
                    value={userAnswers[task.id] || ''}
                    onChange={(e) => handleInputChange(e, task.id)}
                    className="border p-2 rounded w-1/2"
                    placeholder="Deine Antwort"
                  />

                  {/* Button für den Hinweis */}
                  <button
                    onClick={() => handleToggleHint(task.id)}
                    className="ml-2 bg-[#003f56] hover:bg-[#004f66] text-white px-3 py-2 rounded-lg flex items-center"
                  >
                    <Image src="/gluhbirne_weiss.png" alt="Hint" width={24} height={24} />
                  </button>
                </div>

                {/* Anzeige des Hinweises */}
                {showHint[task.id] && (
                  <p className="text-gray-600 text-sm mt-2">{task.hint}</p>
                )}

                {checked && (
                  <p className={`mt-2 ${results[task.id] ? 'text-green-500' : 'text-red-500'}`}>
                    {results[task.id]
                      ? 'Richtig'
                      : `Falsch, die richtige Antwort ist: ${task.solution}`}
                  </p>
                )}
              </div>
            ))}
          </div>
        ))}

        <button
          onClick={handleCheckAnswers}
          className="bg-[#003f56] hover:bg-[#004f66] text-white px-4 py-2 rounded hover:bg-[#004f66]"
        >
          Prüfen
        </button>
      </div>
    </div>
  );
}
