'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Image from 'next/image';

export default function DashboardPage() {
  const [userName, setUserName] = useState('');
  const [correctExercises, setCorrectExercises] = useState(0);
  const totalExercises = 18; // Maximal richtige Anzahl an Übungen (Deutschübung mit ID 6 kann nicht richtig/falsch sein)
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: userProfile, error: profileError } = await supabase
          .from('profiles')
          .select('first_name, last_name')
          .single();

        if (profileError) {
          console.error('Error fetching user profile:', profileError);
          return;
        }

        setUserName(userProfile?.first_name || userProfile?.last_name || 'User');
      } catch (error) {
        console.error('Unexpected error fetching user profile:', error);
      }
    };

    const fetchExerciseData = async () => {
      try {
        const { data: userExercises, error: taskError } = await supabase
          .from('user_exercises')
          .select('question_id, is_correct, exercise_type')
          .eq('is_correct', true)
          .in('exercise_type', ['mathematik', 'deutsch']);

        if (taskError) {
          console.error('Error fetching exercise data:', taskError);
          return;
        }

        const uniqueCorrectAnswers = userExercises.reduce((unique, exercise) => {
          if (
            exercise.is_correct &&
            !unique.some((item) => item.question_id === exercise.question_id)
          ) {
            unique.push(exercise);
          }
          return unique;
        }, []);

        setCorrectExercises(uniqueCorrectAnswers.length);

        const newBadges = [];
        const mathCompleted = uniqueCorrectAnswers.some(
          (task) => task.exercise_type === 'mathematik'
        );
        const germanCompleted = uniqueCorrectAnswers.some(
          (task) => task.exercise_type === 'deutsch'
        );
        if (mathCompleted) newBadges.push('Mathematik-Absolvent');
        if (germanCompleted) newBadges.push('Deutsch-Absolvent');
        if (uniqueCorrectAnswers.length === totalExercises) newBadges.push('Alle Aufgaben bestanden');

        setBadges(newBadges);
      } catch (error) {
        console.error('Unexpected error fetching exercise data:', error);
      }
    };

    fetchUserData();
    fetchExerciseData();
  }, []);

  const completionPercentage = Math.round((correctExercises / totalExercises) * 100);

  return (
    <div className="min-h-screen">
      {/* Header Bild and Titel */}
      <div className="relative w-full h-[400px]">
        <Image
          src="/dashboard.jpeg"
          alt="Dashboard"
          fill={true}
          objectFit="cover"
          objectPosition="center"
          className="rounded-lg"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white drop-shadow-lg">Dashboard</h1>
        </div>
      </div>

      <div className="container mx-auto p-6 mt-12">
        {/* Begrüssung */}
        <h2 className="text-3xl font-semibold mb-8">Hallo, {userName}</h2>

        <div className="flex">
          {/* Fortschritt */}
          <div className="w-1/3 flex flex-col items-center">
            <div className="w-48 h-48">
              <CircularProgressbar
                value={completionPercentage}
                text={`${completionPercentage}%`}
                styles={buildStyles({
                  pathColor: '#003f56',
                  textColor: '#003f56',
                  trailColor: '#d6d6d6',
                })}
              />
            </div>
            <p className="text-lg mt-4">
              Du hast {completionPercentage}% der Übungen richtig beantwortet.
            </p>
          </div>

          {/* Badges */}
          <div className="w-2/3 ml-8">
            <h2 className="text-2xl font-semibold mb-4">Badges</h2>
            <div className="flex flex-wrap gap-4">
              {badges.map((badge, index) => (
                <div
                  key={index}
                  className="bg-[#003f56] text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md"
                >
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
