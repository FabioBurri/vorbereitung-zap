'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import exercises from '../../data/deutsch_exercises.json';
import Image from 'next/image';
import { supabase } from '../../lib/supabaseClient';

export default function DeutschPage() {
  const { data: session } = useSession();
  const [userAnswers, setUserAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [results, setResults] = useState({});
  const [showHint, setShowHint] = useState({});
  
  const userId = session?.user?.id;

  useEffect(() => {
    if (userId) {
      const fetchUserAnswers = async () => {
        const { data: savedAnswers, error } = await supabase
          .from('user_exercises')
          .select('*')
          .eq('user_id', userId)
          .eq('exercise_type', 'deutsch');

        if (!error && savedAnswers) {
          const answers = {};
          savedAnswers.forEach((answer) => {
            answers[answer.question_id] = answer.user_answer;
          });
          setUserAnswers(answers);
        }
      };

      fetchUserAnswers();
    }
  }, [userId]);

  const handleInputChange = (e, id) => {
    setUserAnswers({
      ...userAnswers,
      [id]: e.target.value,
    });
  };

  const handleCheckAnswers = async () => {
    const currentResults = {};
  
    if (userId) {
      for (const aufgabe of exercises.uebungen.deutsch.aufgaben) {
        for (const task of aufgabe.tasks) {
          const userAnswer = userAnswers[task.id];
  
          const isCorrect = task.type === 'multiple_choice'
            ? userAnswer === task.solution
            : userAnswer === task.solution;
  
          currentResults[task.id] = isCorrect;
  
          const { data: existingEntry, error: fetchError } = await supabase
            .from('user_exercises')
            .select('id')
            .eq('user_id', userId)
            .eq('exercise_type', 'deutsch')
            .eq('question_id', task.id)
            .maybeSingle();
  
          if (fetchError && fetchError.code !== 'PGRST116') {
            console.error(`Error checking entry for task ${task.id}:`, fetchError);
            continue;
          }
  
          if (existingEntry) {
            const { error: updateError } = await supabase
              .from('user_exercises')
              .update({
                question: task.question,
                user_answer: userAnswer || '',
                is_correct: isCorrect,
              })
              .eq('id', existingEntry.id);
  
            if (updateError) {
              console.error(`Error updating entry for task ${task.id}:`, updateError);
            }
          } else {
            const { error: insertError } = await supabase.from('user_exercises').insert({
              user_id: userId,
              exercise_type: 'deutsch',
              question_id: task.id,
              question: task.question,
              user_answer: userAnswer || '',
              is_correct: isCorrect,
            });
  
            if (insertError) {
              console.error(`Error inserting entry for task ${task.id}:`, insertError);
            }
          }
        }
      }
    }
  
    setResults(currentResults);
    setChecked(true);
  };
  
  const handleClearAll = async () => {
    if (userId) {
      const { error } = await supabase
        .from('user_exercises')
        .delete()
        .eq('user_id', userId)
        .eq('exercise_type', 'deutsch');

      if (error) {
        console.error('Error clearing data:', error);
      }
    }

    setUserAnswers({});
    setChecked(false);
    setResults({});
  };

  const handleToggleHint = (id) => {
    setShowHint((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div className="min-h-screen">
      <div className="relative w-full h-[400px]">
        <Image
          src="/deutsch.jpg"
          alt="Deutsch"
          fill={true}
          objectFit="cover"
          objectPosition="center"
          className="rounded-lg"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white drop-shadow-lg">Übungen Deutsch</h1>
        </div>
      </div>

      <div className="container mx-auto p-6 mt-12">
        
        {/* Lead */}
        <p className="text-lg leading-relaxed mb-12">
          Auf dieser Seite erwartet dich ein Textverständnis. Du hast keinen Zeitdruck, beim Beantworten der Fragen.
          Wenn du Hilfe benötigst, kannst du neben dem Antwortfeld auf den Button klicken. Dieser gibt dir einen kleinen
          Hinweis. Klicke am Ende der Seite auf «Prüfen», um deine Antworten mit den Lösungen zu vergleichen. Mit dem Button
          «Alle Eingaben löschen» kannst du deine Antworten löschen und bei Bedarf die Fragen nochmals neu beantworten.
        </p>

        {/* Verständnistext */}
        <div>
          <p className="font-semibold mb-6">Elefanten im Garten</p>
          <p className="mb-8 text-justify">
            Ich schlenderte durch die Marktgasse und traf zufällig auf Sarah. Sie sah aus wie früher. Wenn ich Sarah auch Ewigkeiten
            nicht mehr gesehen hatte, erkannte ich sie dennoch sofort wieder. Sarah war zurückhaltend. Bei der Umarmung, bei der wir
            uns zur Begrüssung drückten, war ich diejenige, die fester drückte. Sie habe nicht viel Zeit, sie müsse gleich weiter,
            sagte sie zu Beginn mit einer so leisen Stimme, als wollte sie meine Ohren schonen. Ob sie nicht doch Zeit hätte, mit mir
            wenigstens eine Tasse Tee trinken zu gehen? Sie habe keine Zeit, wiederholte sie und lächelte dabei verlegen, als ob ich
            die Wahrheit nicht ertragen könnte. Ich erinnerte mich an eines unserer ersten Gespräche zurück, als habe es erst gestern
            und nicht vor zwanzig Jahren in der zweiten Klasse der Primarschule stattgefunden.
          </p>
          <p className="mb-8 text-justify">
            Ich erklärte Sarah damals scheinbar gleichgültig: «Im Kosovo wohnten wir vor dem Krieg ausserhalb des Dorfes, wir hatten
            Elefanten im Garten. Der kleinste steckte seinen Kopf durch das Fenster in mein Zimmer im Erdgeschoss und wollte mit Nüssen
            gefüttert werden.»
          </p>
          <p className="mb-8 text-justify">
            «Wie Dumbo, der Elefant aus dem Trickfilm?», wollte Sarah staunend wissen.
          </p>
          <p className="mb-8 text-justify">
            «Ja, genau wie der hat er geheissen.» Dieser Name passte gut zu ihm. Ich hätte auf die Schnelle keinen besseren erfinden können.
            «Ich wollte noch eine Giraffe, doch mein Vater meinte, die würde dann sogar noch über die Fenster der zweiten Etage hinauswachsen,
            sodass die Leute im Dorf sie sehen könnten. Wir aber wollten unsere Tiere geheim halten, damit niemand sie uns wegnehmen konnte.»
          </p>
          <p className="mb-8 text-justify">
            «Weshalb sollte euch jemand die Tiere wegnehmen, Meral? Und habt ihr die Tiere mit in die Schweiz genommen?»
          </p>
          <p className="mb-8 text-justify">
            Sarah war misstrauisch meinen Geschichten gegenüber. Jedes Mal, wenn ich ihr damals von meiner Heimat erzählte, stellte sie mir
            viele Fragen.
          </p>
          <p className="mb-8 text-justify">
            «Wir hatten sogar einen Löwen im Garten, der war gefährlich. Einmal hat der Löwe meinen Grossvater angegriffen, doch der hat sich
            selbst helfen können. Tausend Kriege hatte er da schon erlebt, da war ein Löwe rein gar nichts dagegen. Mein Grossvater hatte nach
            diesem Angriff nur zerrissene Hosen.»
          </p>
          <p className="mb-8 text-justify">
            «Ihr hattet einen Löwen als Haustier?», fragte Sarah zweifelnd.
          </p>
          <p className="mb-8 text-justify">
            Ich konnte nicht damit aufhören, ich hatte sonst ja nichts zu erzählen, nicht von Auslandferien oder von tollen Geschenken zum
            Geburtstag oder von Ausflügen. Was hätte ich denn erzählen sollen nach den Ferien, wenn Herr Lang uns im Unterricht fragte, was wir
            Spannendes erlebt hätten? Hätte ich vielleicht erzählen sollen, dass meine Eltern sich oft gestritten hatten, weil sie sich jeden
            Tag Sorgen machten? Dass sie als Asylbewerber* nicht arbeiten und reisen durften, uns Mädchen anschrien? Oder wie ich alleine war,
            weil niemand mich angerufen hatte, und dass ich mich die ganze Zeit über gelangweilt hatte? Oder vielleicht, wie ich oft geweint
            und meine Cousinen und Freundinnen vermisst hatte?
          </p>
          <p className="mb-8 text-justify">
            «Der Löwe, der übrigens auch so hiess, einfach nur ‘Löwe’», ich wusste nämlich keinen anderen Namen für ihn, «der Löwe war, nachdem
            er mit meinem Grossvater gekämpft hatte, sanft geworden, spielte sogar mit mir und meiner Schwester im Garten. Wir mussten uns nicht
            mehr fürchten. Ich glaube, mein Grossvater hatte ihm etwas ins Ohr geflüstert, einen Geheimnamen vielleicht, wie man das bei den
            kleinen Kindern macht, um ihnen ihren Namen zu geben, man flüstert ihren Namen drei Mal in ihr Ohr. Der Löwe war bestimmt nur darum
            böse gewesen, weil wir ihm keinen Namen gegeben hatten.»
          </p>
          <p className="mb-8 text-justify">
            «Treffen wir uns doch irgendwann einmal», meinte Sarah distanziert, «ich würde dich gerne wiedersehen. Wir haben uns schon so lange
            nicht gesprochen. Ich wollte dich anrufen. Aber ich arbeite viel in der letzten Zeit und komme zu nichts. Ausserdem bin ich wieder
            umgezogen. Komm mich doch besuchen, ich würde mich wirklich freuen.»
          </p>
          <p className="mb-8 text-justify">
            Ich sagte «ja» und drückte sie fest an mich. Ihre Handflächen klopften leicht auf meinen Rücken. «Ich rufe dich nächste Woche an,
            versprochen!», rief sie mir noch über die Schultern zurückblickend zu, bevor sie in einer Gasse verschwand. Heute war es an mir, ihr
            misstrauisch nachzuschauen.
          </p>
        </div>

        {/* Aufgaben */}
        {exercises.uebungen.deutsch.aufgaben.map((aufgabe) => (
          <div key={aufgabe.id} className="mb-10">
            <h3 className="text-[#003f56] font-semibold mb-4 text-xl">{aufgabe.title}</h3>
            {aufgabe.id === 'aufgabe_4' && aufgabe.subtitle && (
              <p className="text-base mb-4">{aufgabe.subtitle}</p>
            )}

            {aufgabe.tasks.map((task) => (
              <div key={task.id} className="mb-6">
                {aufgabe.id !== 'aufgabe_4' && (
                  <>
                    <p className="text-black text-base mb-2">{task.question}</p>
                    <div className="flex items-center mb-4">
                      <input
                        type="text"
                        value={userAnswers[task.id] || ''}
                        onChange={(e) => handleInputChange(e, task.id)}
                        className="border p-2 rounded w-1/2"
                        placeholder="Deine Antwort"
                      />
                      <button
                        onClick={() => handleToggleHint(task.id)}
                        className="ml-2 bg-[#003f56] hover:bg-[#004f66] text-white px-3 py-2 rounded-lg flex items-center"
                      >
                        <Image src="/gluhbirne_weiss.png" alt="Hint" width={24} height={24} />
                      </button>
                    </div>
                  </>
                )}

                {aufgabe.id === 'aufgabe_4' && task.type === 'multiple_choice' && (
                  <>
                    <p
                      className="text-base mb-4"
                      dangerouslySetInnerHTML={{
                        __html: task.question
                          .replace('schlenderte', '<strong>schlenderte</strong>')
                          .replace('gleichgültig', '<strong>gleichgültig</strong>')
                          .replace('zerrissene', '<strong>zerrissene</strong>')
                          .replace('sanft', '<strong>sanft</strong>')
                          .replace('distanziert', '<strong>distanziert</strong>'),
                      }}
                    />
                    <div className="grid grid-cols-1 gap-2 mb-6">
                      {(task.options || []).map((option, index) => (
                        <label key={index} className="flex items-center space-x-4">
                          <input
                            type="radio"
                            name={`task-${task.id}`}
                            value={option}
                            checked={userAnswers[task.id] === option}
                            onChange={(e) => handleInputChange(e, task.id)}
                            className="appearance-none h-5 w-5 border-2 border-[#003f56] rounded-sm checked:bg-[#003f56]"
                          />
                          <span className="text-black">{option}</span>
                        </label>
                      ))}
                    </div>
                  </>
                )}

                {showHint[task.id] && <p className="text-gray-600 text-sm mt-2">{task.hint}</p>}

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

        <div className="flex gap-4">
          <button
            onClick={handleCheckAnswers}
            className="bg-[#003f56] hover:bg-[#004f66] text-white px-4 py-2 rounded"
          >
            Prüfen
          </button>
          <button
            onClick={handleClearAll}
            className="bg-[#003f56] hover:bg-[#004f66] text-white px-4 py-2 rounded"
          >
            Alle Eingaben löschen
          </button>
        </div>
      </div>
    </div>
  );
}