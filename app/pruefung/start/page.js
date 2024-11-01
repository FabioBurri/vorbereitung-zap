'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function ExamPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timer, setTimer] = useState(3600);

  useEffect(() => {
    fetch('/api/mathematik_exam')
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then((data) => {
        setTasks(data.exam.tasks);
      })
      .catch((error) => {
        console.error('Failed to fetch exam data:', error);
      });
  }, []);

  useEffect(() => {
    if (timer <= 0) {
      handleSubmit();
      return;
    }
    const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(countdown);
  }, [timer]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleNext = () => {
    if (currentTask < tasks.length - 1) {
      setCurrentTask(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentTask > 0) {
      setCurrentTask(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Exam submitted:', answers);
    router.push('/pruefung/abgabe');
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const renderPriceTable = () => (
    <div className="mt-4 mb-8">
      <h4 className="text-lg font-semibold mb-2">Preise</h4>
      <table className="min-w-full border-collapse border border-black text-center">
        <thead>
          <tr className="bg-[#003f56]">
            <th className="border border-black p-2 text-white">Vermietung</th>
            <th className="border border-black p-2 text-white">Anzahl</th>
            <th className="border border-black p-2 text-white">30 min</th>
            <th className="border border-black p-2 text-white">1 h</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-black p-2">Pedalo</td>
            <td className="border border-black p-2">10</td>
            <td className="border border-black p-2">15.-</td>
            <td className="border border-black p-2">25.-</td>
          </tr>
          <tr>
            <td className="border border-black p-2">Ruderboot</td>
            <td className="border border-black p-2">6</td>
            <td className="border border-black p-2"></td>
            <td className="border border-black p-2">30.-</td>
          </tr>
          <tr>
            <td className="border border-black p-2">SUP</td>
            <td className="border border-black p-2">15</td>
            <td className="border border-black p-2"></td>
            <td className="border border-black p-2">17.-</td>
          </tr>
          <tr>
            <td className="border border-black p-2">Kajak</td>
            <td className="border border-black p-2"></td>
            <td className="border border-black p-2">13.-</td>
            <td className="border border-black p-2"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen p-6 pt-20">
      {/* Timer */}
      <div className="relative">
        <div className="absolute top-0 right-0 mt-4">
          <div className="text-right">
            <p className="text-black-500">Verbleibende Zeit</p>
            <p className="text-2xl font-bold text-[#003f56]">{formatTime(timer)}</p>
          </div>
        </div>
      </div>

      {/* Taskliste innerhalb der Aufgaben */}
      <div className="mb-6 flex space-x-4 overflow-x-auto">
        {tasks.map((task, index) => {
          const isCurrentTask = currentTask === index;
          const isAnswered = task.questions.every(q => answers[q.id]);
          return (
            <button
              key={task.task_id}
              onClick={() => setCurrentTask(index)}
              className={`p-2 rounded 
                ${isCurrentTask ? 'bg-[#006489] text-white' : ''}
                ${isAnswered && !isCurrentTask ? 'bg-[#003f56] text-white' : ''}
                ${!isAnswered && !isCurrentTask ? 'bg-gray-200' : ''}
                hover:bg-[#006489] transition-colors`}
            >
              {index + 1}
            </button>
          );
        })}
      </div>

      {tasks[currentTask] && (
        <div className="mb-4">
          <h2 className="text-xl font-bold text-[#003f56] mb-6">{tasks[currentTask].title}</h2>
          <h3 className="text-black font-semibold mb-6">{tasks[currentTask].subtitle}</h3>

          {/* Rendert Bilder für Aufgabe 7 und Aufgabe 8 */}
          {tasks[currentTask].task_id === "task_7" && (
            <Image
              src="/Aufgabe 7.png"
              alt="Aufgabe 7 Bild"
              width={350}
              height={210}
              className="mb-6"
            />
          )}
          {tasks[currentTask].task_id === "task_8" && (
            <Image
              src="/Aufgabe 8.png"
              alt="Aufgabe 8 Bild"
              width={200}
              height={120}
              className="mb-6"
            />
          )}

          {/* Rendert Preistabelle für die zweite Aufgabe */}
          {tasks[currentTask].task_id === "task_2" && renderPriceTable()}

          {tasks[currentTask].questions.map((question) => (
            <div key={question.id} className="mb-6">
              <p className="text-base font-normal mb-2">{question.question}</p>
              {question.formula && (
                <p className="text-base italic text-black mb-2">{question.formula}</p>
              )}
              <textarea
                className="w-full p-2 border border-gray-300 rounded"
                rows="2"
                placeholder="Deine Antwort..."
                value={answers[question.id] || ''}
                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              ></textarea>
            </div>
          ))}
        </div>
      )}

      {/* Navigation innerhalb der Aufgaben */}
      <div className="flex justify-between">
        <div className="w-1/2">
          {currentTask > 0 ? (
            <button
              onClick={handleBack}
              className="bg-[#003f56] text-white px-4 py-2 rounded hover:bg-[#004f66] transition-colors"
            >
              Zurück
            </button>
          ) : (
            <div className="w-[85px]"></div>
          )}
        </div>
        <div className="w-1/2 flex justify-end">
          {currentTask < tasks.length - 1 ? (
            <button
              onClick={handleNext}
              className="bg-[#003f56] text-white px-4 py-2 rounded hover:bg-[#004f66] transition-colors"
            >
              Weiter
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="bg-[#003f56] text-white px-4 py-2 rounded hover:bg-[#004f66] transition-colors"
            >
              Prüfung abschliessen
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
