'use client'

import { useState, useEffect } from 'react';
import exercises from '../../data/mathematik_exercises.json';
import { InlineMath } from 'react-katex';
import Image from 'next/image';

// Reisetabelle für Aufgabe 2
const TravelTable = () => {
  return (
    <table className="min-w-full border-collapse border border-black text-center mt-4 mb-8">
      <thead>
        <tr className="bg-[#003f56]">
          <th rowSpan="2" className="border border-black p-2 text-white">Verkehrsmittel</th>
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
          <td className="border border-black p-2">Luftlinie</td>
          <td className="border border-black p-2">488 km</td>
          <td className="border border-black p-2"></td>
          <td className="border border-black p-2">493 km</td>
          <td className="border border-black p-2"></td>
        </tr>
        <tr>
          <td className="border border-black p-2">Flugzeug</td>
          <td className="border border-black p-2">490 km</td>
          <td className="border border-black p-2">1 h 15 min</td>
          <td className="border border-black p-2">500 km</td>
          <td className="border border-black p-2">1 h 15 min</td>
        </tr>
        <tr>
          <td className="border border-black p-2">Zug</td>
          <td className="border border-black p-2">575 km</td>
          <td className="border border-black p-2">4 h 10 min</td>
          <td className="border border-black p-2">848 km</td>
          <td className="border border-black p-2">6 h 50 min</td>
        </tr>
        <tr>
          <td className="border border-black p-2">Auto</td>
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
    const { value } = e.target;

    // Ensure only one checkbox is selected (either 'true' or 'false')
    setUserAnswers({
      ...userAnswers,
      [id]: value,
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

  const handleClearAll = () => {
    setUserAnswers({});
    setChecked(false);
    setResults({});
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

      {/* Lead */}
      <div className="container mx-auto p-6 mt-12 mb-12">
        <p className="text-lg leading-relaxed mb-12">
          Auf dieser Seite kannst du dein Wissen in Mathematik testen. Du hast keinen Zeitdruck, beim Lösen der Übungen.
          Wenn du Hilfe benötigst, kannst du neben dem Antwortfeld auf den Button klicken. Dieser gibt dir einen kleinen
          Hinweis. Klicke am Ende der Seite auf «Prüfen», um deine Antworten mit den Lösungen zu vergleichen. Mit dem Button
          «Alle Eingaben löschen» kannst du deine Antworten löschen und bei Bedarf die Übung nochmals neustarten. Gib bei den
          Antworten jeweils nur die Lösungszahl ein. Zusätze wie km/h oder Franken werden nicht benötigt.
        </p>

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
              <div key={task.id} className="mb-10">
                {/* Render die Fragen mit den Buchstaben (a, b, c...) */}
                <p className="text-black text-base mb-3" style={{ fontSize: '18px' }}>
                  {letters[taskIndex]}) {task.question && formatQuestion(task.question)}
                </p>

                {/* Render image für Aufgabe 3 */}
                {task.id === 6 && (
                  <Image className="my-6" src="/Aufgabe 3a1.png" alt="Aufgabe 3a1" width={300} height={300} />
                )}
                {task.id === 7 && (
                  <Image className="my-6" src="/Aufgabe 3a2.png" alt="Aufgabe 3a2" width={300} height={300} />
                )}

                {/* Rendert die Mathematik-Formeln unabhängig */}
                {task.formula && (
                  <p className="text-black text-base mb-3" style={{ fontSize: '18px' }}>
                    <InlineMath math={task.formula} />
                  </p>
                )}

                {task.type === 'numeric' && (
                  <div className="flex items-center mb-4">
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
                )}

                {/* Checkbox */}
                {task.type === 'bool' && (
                  <div className="flex items-center gap-4 mb-6">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name={`task-${task.id}`}
                        value="true"
                        checked={userAnswers[task.id] === 'true'}
                        onChange={(e) => handleInputChange(e, task.id)}
                        className="appearance-none h-5 w-5 border-2 border-[#003f56] rounded-sm checked:bg-[#003f56] checked:border-[#003f56]
                                  focus:outline-none focus:ring-2 focus:ring-[#003f56] 
                                  checked:after:content-['✓'] checked:after:text-white checked:after:text-center checked:after:inline-block checked:after:w-full checked:after:h-full checked:after:leading-none checked:after:pt-[2px] flex justify-center items-center"
                      />
                      <span className="text-black ml-2">Richtig</span>
                    </label>

                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name={`task-${task.id}`}
                        value="false"
                        checked={userAnswers[task.id] === 'false'}
                        onChange={(e) => handleInputChange(e, task.id)}
                        className="appearance-none h-5 w-5 border-2 border-[#003f56] rounded-sm checked:bg-[#003f56] checked:border-[#003f56]
                                  focus:outline-none focus:ring-2 focus:ring-[#003f56] 
                                  checked:after:content-['✓'] checked:after:text-white checked:after:text-center checked:after:inline-block checked:after:w-full checked:after:h-full checked:after:leading-none checked:after:pt-[2px] flex justify-center items-center"
                      />
                      <span className="text-black ml-2">Falsch</span>
                    </label>
                  </div>
                )}

                {/* Hinweis */}
                {showHint[task.id] && (
                  <p className="text-gray-600 text-sm mt-2">{task.hint}</p>
                )}

                {checked && task.type === 'bool' && (
                  <p className={`mt-2 ${results[task.id] ? 'text-green-500' : 'text-red-500'}`}>
                    {results[task.id]
                      ? 'Richtig'
                      : `Falsch, die richtige Antwort ist: ${task.solution === 'true' ? 'Richtig' : 'Falsch'}`}
                  </p>
                )}

                {checked && task.type === 'numeric' && (
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

        {/* Prüfen and Clear-Button */}
        <div className="flex gap-4">
          <button
            onClick={handleCheckAnswers}
            className="bg-[#003f56] hover:bg-[#004f66] text-white px-4 py-2 rounded hover:bg-[#004f66]"
          >
            Prüfen
          </button>
          <button
            onClick={handleClearAll}
            className="bg-[#003f56] hover:bg-[#004f66] text-white px-4 py-2 rounded hover:bg-[#004f66]"
          >
            Alle Eingaben löschen
          </button>
        </div>
      </div>
    </div>
  );
}
