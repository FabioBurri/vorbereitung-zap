'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { supabase } from '../lib/supabaseClient';

export default function KursePage() {
  const { data: session } = useSession();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [formData, setFormData] = useState({
    vorname: '',
    name: '',
    email: session?.user?.email || '',
    courseName: '',
    date: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (session?.user?.id) {
        const { data, error } = await supabase
          .from('profiles')
          .select('first_name, last_name')
          .eq('id', session.user.id)
          .single();

        if (data) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            firstname: data.first_name,
            name: data.last_name,
          }));
        } else if (error) {
          console.error('Error fetching profile data:', error.message);
        }
      }
    };

    fetchProfileData();
  }, [session?.user?.id]);

  const courses = [
    {
      title: 'Auffrischungskurs Mathematik',
      description:
        'Du fühlst dich bei spezifischen Themen wie Bruchrechnen oder Satzaufgaben unsicher? Dann ist der Auffrischungskurs der richtige für dich! Melde dich an und bring deine Fragen mit. Die Kurskosten in der Höhe von 50.- Franken können vor Ort bezahlt werden.',
      dates: ['15.04.2025 09:00 – 10:00 Uhr', '20.05.2025 10:00 – 11:00 Uhr'],
      price: '50.- Franken (wird vor Ort bezahlt)',
      location: 'Schule Feld, Feldstrasse 89, 8004 Zürich',
    },
    {
      title: 'Auffrischungskurs Deutsch',
      description:
        'Du fühlst dich bei spezifischen Themen wie beispielsweise beim Textverständnis unsicher? Dann ist der Auffrischungskurs der richtige für dich! Bring deine Fragen mit und trainiere mit Fachpersonen. Die Kurskosten in der Höhe von 50.- Franken können vor Ort bezahlt werden.',
      dates: ['22.04.2025 14:00 – 15:00 Uhr', '10.06.2025 11:00 – 12:00 Uhr'],
      price: '50.- Franken (wird vor Ort bezahlt)',
      location: 'Schule Dietikon, Schöneggstrasse 30, 8953 Dietikon',
    },
    {
      title: 'Intensivkurs Mathematik',
      description:
        'Du möchtest den gesamten Stoff nochmals intensiv bearbeiten? Melde dich dazu für einen Intensivkurs an! Während drei Stunden kannst du alle deine Fragen stellen und erhälst Unterstützung bei allen Themen rund um die Mathematik. Die Kurskosten in der Höhe von 150.- Franken können vor Ort bezahlt werden.',
      dates: ['05.05.2025 09:00 – 12:00 Uhr', '02.06.2025 08:00 – 11:00 Uhr'],
      price: '150.- Franken (wird vor Ort bezahlt)',
      location: 'Sekundarschulverwaltung Uster, Winterthurerstrasse 18a, 8610 Uster',
    },
    {
      title: 'Intensivkurs Deutsch',
      description:
        'Du möchtest den gesamten Stoff nochmals intensiv bearbeiten? Melde dich für einen Intensivkurs an! Ob Textverständnis, Zeitformen oder Grammatik - die Expertinnen und Experten helfen dir bei allen Fragen. Die Kurskosten in der Höhe von 150.- Franken können vor Ort bezahlt werden.',
      dates: ['10.05.2025 13:00 – 16:00 Uhr', '20.06.2025 14:00 – 17:00 Uhr'],
      price: '150.- Franken (wird vor Ort bezahlt)',
      location: 'Schulhaus Büelwiesen, Büelhofstrasse 32, 8405 Winterthur',
    },
  ];

  const handleOpenModal = (course) => {
    setSelectedCourse(course);
    setFormData({
      ...formData,
      courseName: course.title,
      date: course.dates[0],
    });
    setShowSuccessMessage(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    const subject = `Neue Anmeldung für den Kurs ${formData.courseName}`;
    const content = `
      <h1>Neue Kursanmeldung</h1>
      <p>Es hat sich eine neue Person für einen Kurs angemeldet. Bitte melden Sie sich so bald wie möglich via E-Mail beim Schüler beziehungsweise bei der Schülerin.</p>
      <p><strong>Vorname:</strong> ${formData.firstname}</p>      
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>E-Mail:</strong> ${formData.email}</p>
      <p><strong>Kurs:</strong> ${formData.courseName}</p>
      <p><strong>Datum:</strong> ${formData.date}</p>
    `;

    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, content }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Fehler beim Versenden der Anmeldung.');
      }
  
      setShowSuccessMessage(true);
      setSuccessMessage('Anmeldung erfolgreich gesendet!');
    } catch (error) {
      console.error('Fehler beim Versenden der Anmeldung:', error);
      setErrorMessage(error.message || 'Fehler beim Versenden der Anmeldung. Bitte versuche es erneut.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header Bild und Titel */}
      <div className="relative w-full h-[400px]">
        <img
          src="/kurse.jpg"
          alt="Kurse"
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white drop-shadow-lg">Anmeldung Kurse</h1>
        </div>
      </div>

      {/* Lead */}
      <div className="container mx-auto p-6 mt-12">
        <p className="text-lg leading-relaxed mb-12">
        Auf dieser Seite kannst du dich für vor Ort stattfindende Vorbereitungskurse anmelden. Die Kurse helfen dir bei der Vorbereitung auf deine Prüfungen. Wähle einen Kurs aus, den du besuchen möchtest. Der Kursleiter beziehungsweise die Kursleiterin wird informiert. Die kursleitende Person wird sich anschliessend bei dir melden.
        </p>

        {/* Kursübersicht */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {courses.map((course, index) => (
            <div key={index} className="border p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-[#003f56] mb-4">{course.title}</h2>
              <p className="mb-4">{course.description}</p>
              <p className="text-gray-700 font-semibold mb-2">{course.location}</p>
              <p className="text-gray-700 mb-2">
                {course.dates.map((date, i) => (
                  <span key={i} className="block">{date}</span>
                ))}
              </p>
              <p className="text-gray-700 mb-4">{course.price}</p>
              <button
                className="bg-[#003f56] text-white px-4 py-2 rounded hover:bg-[#004f66]"
                onClick={() => handleOpenModal(course)}
              >
                Anmelden
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Kursanmeldung */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] md:w-[50%] relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-3xl"
            >
              &times;
            </button>

            {showSuccessMessage ? (
              <div>
                <p className="text-black mb-6">
                  Deine Anmeldung war erfolgreich, vielen Dank! Die Lehrperson wird dich direkt via E-Mail kontaktieren.
                </p>
                <button
                  onClick={handleCloseModal}
                  className="bg-[#003f56] text-white px-4 py-2 rounded hover:bg-[#004f66]"
                >
                  Schliessen
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">Vorname</label>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border p-2 rounded"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border p-2 rounded"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-Mailadresse</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border p-2 rounded"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">Kursdatum wählen</label>
                  <select
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border p-2 rounded"
                  >
                    {selectedCourse.dates.map((date, index) => (
                      <option key={index} value={date}>{date}</option>
                    ))}
                  </select>
                </div>

                {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
                {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`bg-[#003f56] text-white px-4 py-2 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? 'Anmeldung wird gesendet...' : 'Für den Kurs anmelden'}
                </button>
              </form>
            )}
        </div>
      </div>
    )}
    </div>
  );
}