'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';

const Navbar = () => {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await signOut({
        redirect: true,
        callbackUrl: '/',
      });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-[#003f56] w-full h-16 p-4 fixed top-0 z-10 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center">
        <Link href={session ? '/profil' : '/'}>
          <div className="relative w-20 h-14 cursor-pointer">
            <Image 
              src="/ZAP_logo_transparent.svg"
              alt="Logo ZAP"
              fill
              style={{ objectFit: 'contain' }}
              className="cursor-pointer"
              priority
            />
          </div>
        </Link>
      </div>

      {/* Hamburger Button */}
      <button
        className="text-white text-xl md:hidden focus:outline-none"
        onClick={toggleMenu}
      >
        &#9776;
      </button>

      {/* Navigationslinks */}
      <ul
        className={`flex-col md:flex-row md:flex md:items-center md:space-x-8 bg-[#003f56] md:bg-transparent fixed md:static top-16 left-0 w-full md:w-auto p-4 md:p-0 transition-transform duration-300 ${
          menuOpen ? 'translate-x-0' : 'translate-x-[-100%]'
        } md:translate-x-0 space-y-4 md:space-y-0 pl-[35px] md:pl-0 `}
      >
        {session ? (
          <>
            <li className="text-white text-base font-normal">
              <Link href="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
            </li>
            <li className="text-white text-base font-normal">
              <Link href="/uebungen" onClick={() => setMenuOpen(false)}>Übungen</Link>
            </li>
            <li className="text-white text-base font-normal">
              <Link href="/pruefung" onClick={() => setMenuOpen(false)}>Prüfung</Link>
            </li>
            <li className="text-white text-base font-normal">
              <Link href="/lernmaterialien" onClick={() => setMenuOpen(false)}>Lernmaterialien</Link>
            </li>
            <li className="text-white text-base font-normal">
              <Link href="/kurse" onClick={() => setMenuOpen(false)}>Kurse</Link>
            </li>
            <li className="text-white text-base font-normal">
              <Link href="/profil" onClick={() => setMenuOpen(false)}>Profil</Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="bg-white text-[#003f56] px-4 py-2 rounded hover:bg-gray-200 transition-colors text-base font-normal"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="text-white text-base font-normal">
              <Link href="/register" onClick={() => setMenuOpen(false)}>Registrieren</Link>
            </li>
            <li>
              <Link 
                href="/login" 
                className="bg-white text-[#003f56] px-4 py-2 rounded hover:bg-gray-200 transition-colors text-base font-normal"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;