'use client';

import { useState } from 'react';

const germanExercises = [
  {
    id: 1,
    question: 'Was ist die Hauptstadt von Deutschland?',
    correctAnswer: 'Berlin',
  },
  {
    id: 2,
    question: 'Wie viele Bundesländer hat Deutschland?',
    correctAnswer: '16',
  },
];

export default function GermanExercisePage() {
  const [userAnswers, setUserAnswers] = useState({});
  const [results, setResults] = useState(null);

  const handleInputChange = (questionId, value) => {
    setUserAnswers({
      ...userAnswers,
      [questionId]: value,
    });
  };

  const checkAnswers = () => {
    const results = germanExercises.map((exercise) => {
      const isCorrect = exercise.correctAnswer.toLowerCase() === (userAnswers[exercise.id] || '').toLowerCase();
      return { ...exercise, isCorrect, userAnswer: userAnswers[exercise.id] };
    });
    setResults(results);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Deutsch Übung</h1>

      {germanExercises.map((exercise) => (
        <div key={exercise.id} className="mb-4">
          <p>{exercise.question}</p>
          <input
            type="text"
            value={userAnswers[exercise.id] || ''}
            onChange={(e) => handleInputChange(exercise.id, e.target.value)}
            className="border rounded p-2"
          />
        </div>
      ))}

      <button onClick={checkAnswers} className="bg-blue-500 text-white p-2 rounded">
        Prüfen
      </button>

      {results && (
        <div className="mt-6">
          <h2 className="text-xl font-bold">Ergebnisse</h2>
          {results.map((result) => (
            <div key={result.id} className={`p-4 ${result.isCorrect ? 'bg-green-200' : 'bg-red-200'}`}>
              <p>{result.question}</p>
              <p>Deine Antwort: {result.userAnswer}</p>
              {!result.isCorrect && <p>Korrekte Antwort: {result.correctAnswer}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
