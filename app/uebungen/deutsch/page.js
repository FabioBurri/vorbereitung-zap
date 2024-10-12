'use client';

import { useState } from 'react';
import exercises from '../../data/deutsch_exercises.json';
import Image from 'next/image';
import { supabase } from '../../lib/supabaseClient';

export default function DeutschPage() {
  const [userAnswers, setUserAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [results, setResults] = useState({});
  const [showHint, setShowHint] = useState({});

  const handleInputChange = (e, id, subIndex = null) => {
    if (subIndex !== null) {
      setUserAnswers({
        ...userAnswers,
        [id]: {
          ...(userAnswers[id] || {}),
          [subIndex]: e.target.value,
        },
      });
    } else {
      setUserAnswers({
        ...userAnswers,
        [id]: e.target.value,
      });
    }
  };

  const handleCheckAnswers = async () => {
    const currentResults = {};
    exercises.uebungen.deutsch.aufgaben.forEach((aufgabe) => {
      aufgabe.tasks.forEach(async (task) => {
        if (task.type !== 'multi') {
          const isCorrect = userAnswers[task.id] === task.solution;
          currentResults[task.id] = isCorrect;
  
          const user = await supabase.auth.getUser();
          const user_id = user.data?.user?.id;
  
          if (user_id) {
            const { data, error } = await supabase
              .from('user_exercises')
              .select('id')
              .eq('user_id', user_id)
              .eq('question_id', task.id)
              .single();
  
            if (data) {
              await supabase
                .from('user_exercises')
                .update({
                  exercise_type: 'deutsch',
                  user_answer: userAnswers[task.id],
                  is_correct: isCorrect,
                  question: task.question,
                })
                .eq('id', data.id);
            } else {
              await supabase.from('user_exercises').insert({
                user_id,
                exercise_type: 'deutsch',
                question_id: task.id,
                question: task.question,
                user_answer: userAnswers[task.id],
                is_correct: isCorrect,
              });
            }
          }
        }
      });
    });
    setResults(currentResults);
    setChecked(true);
  };  

  const handleClearAll = async () => {
    const user = await supabase.auth.getUser();
    const user_id = user.data?.user?.id;
  
    if (user_id) {
      await supabase
        .from('user_exercises')
        .delete()
        .eq('user_id', user_id)
        .eq('exercise_type', 'deutsch');
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
          src="/Lernen.jpg"
          alt="Lernen"
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
            {aufgabe.tasks.map((task) => (
              <div key={task.id} className="mb-6">
                <p className="text-black text-base mb-2">{task.question}</p>

                {/* Aufgabe 5 */}
                {task.id === 8 ? (
                  <div className="grid grid-cols-1 gap-2">
                    {task.options.map((option, index) => (
                      <div key={index} className="mb-4">
                        <p
                          className="text-black text-base mb-2"
                          dangerouslySetInnerHTML={{
                            __html: option.text.replace('schlenderte', '<strong>schlenderte</strong>')
                                              .replace('gleichgültig', '<strong>gleichgültig</strong>')
                                              .replace('zerrissene', '<strong>zerrissene</strong>')
                                              .replace('sanft', '<strong>sanft</strong>')
                                              .replace('distanziert', '<strong>distanziert</strong>'),
                          }}
                        />
                        <div className="grid grid-cols-1 gap-2">
                          {option.answers.map((answer, answerIndex) => (
                            <label key={answerIndex} className="flex items-center space-x-2">
                              <input
                                type="radio"
                                name={`option_${index}`}
                                value={answer}
                                checked={userAnswers[`option_${index}`] === answer}
                                onChange={(e) => handleInputChange(e, `option_${index}`)}
                                className="appearance-none h-5 w-5 border-2 border-[#003f56] rounded-sm 
                                          checked:bg-[#003f56] checked:border-[#003f56] 
                                          focus:outline-none focus:ring-2 focus:ring-[#003f56] 
                                          checked:after:content-['✓'] checked:after:text-white 
                                          checked:after:text-center checked:after:inline-block 
                                          checked:after:w-full checked:after:h-full 
                                          checked:after:leading-none checked:after:pt-[2px] flex justify-center items-center"
                              />
                              <span className="text-black">{answer}</span>
                            </label>
                          ))}
                        </div>
                        {checked && (
                          <p className={`mt-2 ${userAnswers[`option_${index}`] === option.solution ? 'text-green-500' : 'text-red-500'}`}>
                            {userAnswers[`option_${index}`] === option.solution
                              ? 'Richtig'
                              : `Falsch, die richtige Antwort ist: ${option.solution}`}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : task.type === 'text' ? ( 
                  <div className="flex items-center mb-4">
                    <input
                      type="text"
                      value={userAnswers[task.id] || ''}
                      onChange={(e) => handleInputChange(e, task.id)}
                      className="border p-2 rounded w-1/2"
                      placeholder="Deine Antwort"
                    />
                    {/* Hinweise */}
                    <button
                      onClick={() => handleToggleHint(task.id)}
                      className="ml-2 bg-[#003f56] hover:bg-[#004f66] text-white px-3 py-2 rounded-lg flex items-center"
                    >
                      <Image src="/gluhbirne_weiss.png" alt="Hint" width={24} height={24} />
                    </button>
                  </div>
                ) : null}

                {/* Aufgabe 3 */}
                {task.id === 6 && (
                  <div className="mb-10">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {[1, 2, 3, 4].map((num) => (
                        <input
                          key={num}
                          type="text"
                          value={userAnswers[`aufgabe_3_${num}`] || ''}
                          onChange={(e) => handleInputChange(e, `aufgabe_3_${num}`)}
                          className="border p-2 rounded w-full"
                          placeholder={`Antwort ${num}`}
                        />
                      ))}
                    </div>

                    {/* Mögliche Antworten */}
                    {checked && (
                      <div className="mt-4">
                        <h4 className="text-[#003f56] font-semibold mb-2">Mögliche Antworten:</h4>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>schwächere Umarmung / drückt weniger bei Umarmung</li>
                          <li>Ausrede / angeblich wenig Zeit / muss weiter</li>
                          <li>leise Stimme, als ob sie Merals Ohren schonen wolle</li>
                          <li>verlegenes Lächeln</li>
                          <li>sie wiederholt ihre Ausrede zur Zeitknappheit</li>
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Hinweis */}
                {task.id !== 6 && task.id !== 8 && showHint[task.id] && (
                  <p className="text-gray-600 text-sm mt-2">{task.hint}</p>
                )}

                {/* Resultat */}
                {checked && task.id !== 6 && task.id !== 8 && (
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

        {/* Prüfen und Eingabe-löschen-Button */}
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
