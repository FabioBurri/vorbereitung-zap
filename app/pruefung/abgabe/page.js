'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { supabase } from '../../lib/supabaseClient';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import examData from '../../data/mathematik_exam.json';

export default function ResultsPage() {
  const { data: session } = useSession();
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [grade, setGrade] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  const userId = session?.user?.id;
  const totalQuestions = 14;

  useEffect(() => {
    if (userId) {
      const fetchResults = async () => {
        const { data: userAnswers, error } = await supabase
          .from('user_exercises')
          .select('question_id, user_answer, is_correct')
          .eq('user_id', userId)
          .eq('exercise_type', 'exam');

        if (error) {
          console.error('Error fetching user results:', error);
          return;
        }

        const questions = examData.exam.tasks.flatMap((task) => task.questions);
        
        const mergedAnswers = questions.map((question) => {
          const userAnswer = userAnswers.find((ua) => ua.question_id === question.id);
          return {
            question: question.question,
            user_answer: userAnswer?.user_answer || "Keine Antwort",
            is_correct: userAnswer ? userAnswer.is_correct : false,
            solution: question.solution,
          };
        });

        const correctCount = mergedAnswers.filter((answer) => answer.is_correct).length;
        setCorrectAnswers(correctCount);
        setGrade((correctCount / totalQuestions) * 5 + 1);
        setAnswers(mergedAnswers);

        {/* Konfetti bei einer Note 4 oder höher, stoppt nach zehn Sekunden */}
        if ((correctCount / totalQuestions) * 5 + 1 >= 4) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 10000);
        }
      };

      fetchResults();
    }
  }, [userId]);

  const toggleShowResults = () => {
    setShowResults((prev) => !prev);
  };

  return (
    <div className="min-h-screen p-8 pt-28">
      <div className="text-left">
        <h2 className="text-3xl font-semibold text-[#003f56] mb-4">
          {correctAnswers}/{totalQuestions} Fragen wurden richtig beantwortet!
        </h2>
        <h3 className="text-2xl font-semibold mb-8">
          Note: {grade.toFixed(1)}
        </h3>

        {grade >= 4 ? (
          <p className="text-xl regular text-black mb-4">
            Glückwunsch, du hast den Test bestanden!
          </p>
        ) : (
          <p className="text-xl regular text-black mb-8">
            Leider hast du den Test nicht bestanden.
          </p>
        )}

        {/* Button für Antworten (verbergen) */}
        <button
          onClick={toggleShowResults}
          className="mt-4 px-4 py-2 bg-[#003f56] text-white rounded hover:bg-[#004f66] transition-colors"
        >
          {showResults ? "Antworten verbergen" : "Meine Antworten"}
        </button>

        {/* Antworten */}
        {showResults && (
          <div className="mt-8 text-left">
            <h4 className="text-xl font-semibold mb-8">Deine Antworten</h4>
            {answers.map((answer, index) => (
              <div key={index} className="mb-6">
                <p className="text-base font-semibold">
                  {answer.question}
                </p>
                <p className="text-base">
                  Deine Antwort: {answer.user_answer}
                  <br />
                  {answer.is_correct ? (
                    <span className="text-green-500 font-semibold">Richtig</span>
                  ) : (
                    <>
                      <span className="text-red-500 font-semibold">Falsch</span>
                      <br />
                      Richtige Antwort: {answer.solution}
                    </>
                  )}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Konfetti */}
        {showConfetti && <Confetti width={width} height={height} />}
      </div>
    </div>
  );
}
