'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import Image from 'next/image';
import { supabase } from '../lib/supabaseClient';

export default function ProfilePage() {
  const { data: session } = useSession();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [newProfilePic, setNewProfilePic] = useState(null);
  const defaultProfilePicture = "https://w7.pngwing.com/pngs/981/645/png-transparent-default-profile-united-states-computer-icons-desktop-free-high-quality-person-icon-miscellaneous-silhouette-symbol-thumbnail.png";

  const titleName = firstName || session?.user?.email || 'User';

  const handleSave = async () => {
    const userData = {
      firstName,
      lastName,
      phone,
    };

    // Save profile data to Supabase
    const { data, error } = await supabase
      .from('profiles')
      .update(userData)
      .eq('email', session?.user?.email);

    if (error) {
      console.log('Error updating profile:', error.message);
    } else {
      console.log('Profile updated successfully:', data);
    }

    // If a new profile picture is uploaded, handle the upload logic
    if (newProfilePic) {
      const { data: imageData, error: imageError } = await supabase
        .storage
        .from('avatars') // Assuming you're using a 'avatars' storage bucket in Supabase
        .upload(`public/${session?.user?.email}`, newProfilePic);

      if (imageError) {
        console.log('Error uploading image:', imageError.message);
      } else {
        console.log('Image uploaded successfully:', imageData);
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewProfilePic(file);
  };

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      {/* Header Bild */}
      <div className="relative w-full h-[400px]">
        <Image
          src="/Lernen.jpg"
          alt="Lernen"
          fill={true}
          objectFit="cover"
          objectPosition="center"
          className="rounded-lg"
        />
        {/* Titel */}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white drop-shadow-lg">Profil</h1>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto p-12">
        {/* Erster Container */}
        <div className="flex justify-between items-center max-w-4xl mx-auto mb-12 relative">
          {/* E-Mail oder Vorname */}
          <h1 className="text-3xl font-bold text-[#003f56]">Hallo, {titleName}</h1>

          {/* Profilbild mit Hover-Effekt und Input für Upload */}
          <div className="relative group">
            <Image
              src={session?.user?.image || defaultProfilePicture}
              alt="Profilbild"
              width={150}
              height={150}
              className="rounded-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
              <label htmlFor="profilePicInput" className="text-white text-3xl">+</label>
              <input
                id="profilePicInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          </div>
        </div>

        {/* Zweiter Container */}
        <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Vorname */}
          <div className="col-span-1">
            <label className="text-lg text-[#003f56]">Vorname</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Vorname eingeben"
              className="w-full px-4 py-2 border rounded text-gray-800 focus:ring-0 focus:border-gray-300"
            />
          </div>

          {/* Nachname */}
          <div className="col-span-1">
            <label className="text-lg text-[#003f56]">Nachname</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Nachname eingeben"
              className="w-full px-4 py-2 border rounded text-gray-800 focus:ring-0 focus:border-gray-300"
            />
          </div>

          {/* E-Mail */}
          <div className="col-span-1">
            <label className="text-lg text-[#003f56]">E-Mail</label>
            <input
              type="email"
              value={session?.user?.email || ''}
              readOnly
              className="w-full px-4 py-2 border rounded text-gray-800 bg-gray-200"
            />
          </div>

          {/* Telefonnummer */}
          <div className="col-span-1">
            <label className="text-lg text-[#003f56]">Telefon</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Telefonnummer eingeben"
              className="w-full px-4 py-2 border rounded text-gray-800 focus:ring-0 focus:border-gray-300"
            />
          </div>

          {/* Speichern Knopf */}
          <div className="col-span-2 flex justify-start mt-6">
            <button
              onClick={handleSave}
              className="bg-[#003f56] hover:bg-[#004f66] transition text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg"
            >
              Speichern
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
