'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

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

  return (
    <nav className="bg-[#003f56] w-full h-16 p-4 fixed top-0 z-10 flex items-center">
      {/* Logo */}
      <div className="flex-1 flex items-center">
        <Link href={session ? '/dashboard' : '/'}>
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

      {/* Navigationslinks */}
      <ul className="flex justify-end items-center space-x-8">
        {session ? (
          <>
            <li className="text-white text-base font-normal">
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li className="text-white text-base font-normal">
              <Link href="/uebungen">Übungen</Link>
            </li>
            <li className="text-white text-base font-normal">
              <Link href="/pruefung">Prüfung</Link>
            </li>
            <li className="text-white text-base font-normal">
              <Link href="/lernmaterialien">Lernmaterialien</Link>
            </li>
            <li className="text-white text-base font-normal">
              <Link href="/kurse">Kurse</Link>
            </li>
            <li className="text-white text-base font-normal">
              <Link href="/profil">Profil</Link>
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
              <Link href="/register">Registrieren</Link>
            </li>
            <li>
              <Link href="/login" className="bg-white text-[#003f56] px-4 py-2 rounded hover:bg-gray-200 transition-colors text-base font-normal">
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