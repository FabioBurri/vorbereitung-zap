'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { supabase } from '../lib/supabaseClient';

export default function ProfilePage() {
  const { data: session } = useSession();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [newProfilePic, setNewProfilePic] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const defaultProfilePicture = "https://cdn.pixabay.com/photo/2021/07/25/08/03/account-6491185_640.png";

  const userId = session?.user?.id;

  const titleName = firstName || session?.user?.email || 'User';

  useEffect(() => {
    if (userId) {
      const fetchProfile = async () => {
        const { data, error } = await supabase
          .from('profiles')
          .select('first_name, last_name, phone, avatar_url')
          .eq('id', userId)
          .single();

        if (data) {
          setFirstName(data.first_name || '');
          setLastName(data.last_name || '');
          setPhone(data.phone || '');
          if (data.avatar_url) {
            const { data: publicUrlData } = supabase
              .storage
              .from('avatars')
              .getPublicUrl(data.avatar_url);
            
            setAvatarUrl(`${publicUrlData.publicUrl}?t=${new Date().getTime()}`);
          }
        }

        if (error) {
          console.error('Error fetching profile:', error.message);
        }
      };

      fetchProfile();
    }
  }, [userId]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setNewProfilePic(file);
    setSuccessMessage('');

    if (file && userId) {
      const { data: imageData, error: imageError } = await supabase
        .storage
        .from('avatars')
        .upload(`public/${userId}`, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (imageError) {
        console.log('Error uploading image:', imageError.message);
      } else {
        console.log('Image uploaded successfully:', imageData);

        const { data: updateData, error: updateError } = await supabase
          .from('profiles')
          .update({ avatar_url: imageData.path })
          .eq('id', userId);

        if (updateError) {
          console.log('Error updating profile with avatar URL:', updateError.message);
        } else {
          const { data: publicUrlData } = supabase
            .storage
            .from('avatars')
            .getPublicUrl(imageData.path);
          
          setAvatarUrl(`${publicUrlData.publicUrl}?t=${new Date().getTime()}`);
        }
      }
    }
  };

  const handleSave = async () => {
    if (!userId) {
      console.error("User ID is undefined. Cannot update profile.");
      return;
    }

    const userData = {
      first_name: firstName,
      last_name: lastName,
      phone: phone,
    };

    const { data, error } = await supabase
      .from('profiles')
      .upsert({ ...userData, id: userId })
      .eq('id', userId);

    if (error) {
      console.log('Error updating profile:', error.message);
    } else {
      setSuccessMessage('Das Speichern war erfolgreich.');
    }
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setSuccessMessage('');
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
        <div className="flex justify-between items-center max-w-4xl mx-auto mb-12 relative">
          <h1 className="text-3xl font-bold text-[#003f56]">Hallo, {titleName}</h1>

          <div className="relative group">
            {/* Avatar */}
            <Image
              src={avatarUrl || defaultProfilePicture}
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

        {/* Input Felder */}
        <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="col-span-1">
            <label className="text-lg text-[#003f56]">Vorname</label>
            <input
              type="text"
              value={firstName}
              onChange={handleInputChange(setFirstName)}
              placeholder="Vorname eingeben"
              className="w-full px-4 py-2 border rounded text-gray-800 focus:ring-0 focus:border-gray-300"
            />
          </div>

          <div className="col-span-1">
            <label className="text-lg text-[#003f56]">Nachname</label>
            <input
              type="text"
              value={lastName}
              onChange={handleInputChange(setLastName)}
              placeholder="Nachname eingeben"
              className="w-full px-4 py-2 border rounded text-gray-800 focus:ring-0 focus:border-gray-300"
            />
          </div>

          <div className="col-span-1">
            <label className="text-lg text-[#003f56]">E-Mail</label>
            <input
              type="email"
              value={session?.user?.email || ''}
              readOnly
              className="w-full px-4 py-2 border rounded text-gray-800 bg-gray-200"
            />
          </div>

          <div className="col-span-1">
            <label className="text-lg text-[#003f56]">Telefon</label>
            <input
              type="text"
              value={phone}
              onChange={handleInputChange(setPhone)}
              placeholder="Telefonnummer eingeben"
              className="w-full px-4 py-2 border rounded text-gray-800 focus:ring-0 focus:border-gray-300"
            />
          </div>

          {/* Speichern Knopf */}
          <div className="col-span-2 flex flex-col items-start mt-6">
            <button
              onClick={handleSave}
              className="bg-[#003f56] hover:bg-[#004f66] transition text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg"
            >
              Speichern
            </button>

            {/* Erfolgreiches Speichern */}
            {successMessage && (
              <p className="text-black-600 mt-4">{successMessage}</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
