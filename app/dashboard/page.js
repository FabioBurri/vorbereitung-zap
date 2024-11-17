'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Image from 'next/image';
import 'tippy.js/dist/tippy.css';
import Tippy from '@tippyjs/react';

const badgeInfo = {
  "Leonhard Euler": {
    criteria: "Beantworte alle Mathematikübungen korrekt.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z" />
      </svg>
    ),
  },
  "Johann Goethe": {
    criteria: "Beantworte alle Deutschübungen korrekt.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  "Albert Einstein": {
    criteria: "Beantworte alle Übungen korrekt.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
      </svg>
    ),
  },
  "Mathegenie": {
    criteria: "Löse sechs oder mehr Matheaufgaben richtig.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
      </svg>
    ),
  },
  "Grammatik-Guru": {
    criteria: "Löse sechs oder mehr Deutschaufgaben richtig.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
  },
  "Synonymkenner": {
    criteria: "Beantworte alle Multiple-Choice-Fragen zum Thema Synonyme richtig.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
      </svg>
    ),
  },
  "Prüfungssicher": {
    criteria: "Bestehe die Prüfung.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12" />
      </svg>
    ),
  },
  "Perfektionistisch": {
    criteria: "Vervollständige dein Profil.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    ),
  },
  "Sammler": {
    criteria: "Verdiene fünf oder mehr Abzeichen.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
  },
};


export default function DashboardPage() {
  const [userName, setUserName] = useState('');
  const [correctExercises, setCorrectExercises] = useState(0);
  const totalExercises = 22;
  const [earnedBadges, setEarnedBadges] = useState([]);

  const saveBadgeToDatabase = async (badgeName) => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const userId = session?.user?.id;
      if (!userId) return;

      // Check if badge already exists
      const { data: existingBadges, error: fetchError } = await supabase
        .from('user_badges')
        .select('badge_name')
        .eq('badge_name', badgeName)
        .eq('user_id', userId);

      if (fetchError) {
        console.error(`Error checking badge "${badgeName}" existence:`, fetchError);
        return;
      }

      if (!existingBadges || existingBadges.length === 0) {
        // Insert badge if it doesn't exist
        const { error: insertError } = await supabase.from('user_badges').insert({
          user_id: userId,
          badge_name: badgeName,
        });

        if (insertError) {
          console.error(`Error saving badge "${badgeName}" to database:`, insertError);
        } else {
          console.log(`Badge "${badgeName}" saved successfully.`);
        }
      }
    } catch (error) {
      console.error(`Error handling badge "${badgeName}":`, error);
    }
  };

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

    const fetchProgressAndBadges = async () => {
      try {
        const { data: userExercises, error: exerciseError } = await supabase
          .from('user_exercises')
          .select('question_id, is_correct, exercise_type')
          .eq('is_correct', true);

        if (exerciseError) {
          console.error('Error fetching exercises:', exerciseError);
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

        // Badge Logic
        const mathCompleted =
          uniqueCorrectAnswers.filter((task) => task.exercise_type === 'mathematik').length === 11;
        const germanCompleted =
          uniqueCorrectAnswers.filter((task) => task.exercise_type === 'deutsch').length === 11;
        const allCompleted = uniqueCorrectAnswers.length === totalExercises;

        // Synonymkenner
        const synonymQuestionIds = [7, 8, 9, 10, 11];
        const synonymCorrectAnswers = uniqueCorrectAnswers.filter((task) =>
          synonymQuestionIds.includes(task.question_id)
        );
        const synonymSageCompleted = synonymCorrectAnswers.length === synonymQuestionIds.length;

        // Prüfungssicher
        const examPassed = userExercises.some(
          (task) => task.exercise_type === 'exam' && task.is_correct
        );

        // Perfektionistisch
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('first_name, last_name, avatar_url')
          .single();

        if (profileError) {
          console.error('Error fetching profile:', profileError);
          return;
        }

        const isProfileComplete =
          profile?.first_name &&
          profile?.last_name &&
          profile?.avatar_url;

        // Save earned badges
        const newBadges = [];
        if (mathCompleted) {
          newBadges.push('Leonhard Euler');
          await saveBadgeToDatabase('Leonhard Euler');
        }
        if (germanCompleted) {
          newBadges.push('Johann Goethe');
          await saveBadgeToDatabase('Johann Goethe');
        }
        if (allCompleted) {
          newBadges.push('Albert Einstein');
          await saveBadgeToDatabase('Albert Einstein');
        }
        if (
          mathCompleted &&
          uniqueCorrectAnswers.filter((task) => task.exercise_type === 'mathematik').length >= 6
        ) {
          newBadges.push('Mathegenie');
          await saveBadgeToDatabase('Mathegenie');
        }
        if (
          germanCompleted &&
          uniqueCorrectAnswers.filter((task) => task.exercise_type === 'deutsch').length >= 6
        ) {
          newBadges.push('Grammatik-Guru');
          await saveBadgeToDatabase('Grammatik-Guru');
        }
        if (synonymSageCompleted) {
          newBadges.push('Synonymkenner');
          await saveBadgeToDatabase('Synonymkenner');
        }
        if (examPassed) {
          newBadges.push('Prüfungssicher');
          await saveBadgeToDatabase('Prüfungssicher');
        }
        if (isProfileComplete) {
          newBadges.push('Perfektionistisch');
          await saveBadgeToDatabase('Perfektionistisch');
        }
        if (newBadges.length >= 5) {
          newBadges.push('Sammler');
          await saveBadgeToDatabase('Sammler');
        }

        setEarnedBadges(newBadges);
      } catch (error) {
        console.error('Unexpected error fetching badges:', error);
      }
    };

    fetchUserData();
    fetchProgressAndBadges();
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Fortschrittsanzeige */}
          <div className="flex flex-col items-center lg:items-start">
            <div className="w-48 h-48 mb-4">
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
            <p className="text-lg text-center w-full lg:w-auto">
              Du hast {completionPercentage}% der Übungen richtig beantwortet.
            </p>
          </div>

          {/* Badges */}
          <div className="flex flex-col items-start space-y-4">
            <h2 className="text-2xl font-semibold">Abzeichen</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Object.keys(badgeInfo).map((badge) => {
                const isEarned = earnedBadges.includes(badge);
                return (
                  <div
                    key={badge}
                    className="flex flex-col items-center justify-center space-y-2"
                  >
                    <div
                      className={`w-20 h-20 flex items-center justify-center rounded-full shadow-md ${
                        isEarned ? 'bg-[#003f56] text-white' : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      <Tippy content={badgeInfo[badge].criteria}>
                        {/* Icon */}
                        <div className="flex items-center justify-center w-12 h-12">
                          {badgeInfo[badge].icon}
                        </div>
                      </Tippy>
                    </div>
                    {/* Badge Titel */}
                    <p className="text-center text-sm font-semibold mt-2">{badge}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
