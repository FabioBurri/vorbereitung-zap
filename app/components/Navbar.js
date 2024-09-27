'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async (e) => {
    e.preventDefault();
    await signOut({
      redirect: true,
      callbackUrl: '/',
    });
  };

  return (
    <nav className="bg-gray-800 w-full p-4 fixed top-0 z-10 flex items-center">
      {/* Logo */}
      <div className="flex-1">
        <Link href={session ? '/dashboard' : '/'}>
          <Image 
            src="ZAP_logo_transparent.svg"
            alt="Logo ZAP"
            width={70}
            height={50}
            className="cursor-pointer"
          />
        </Link>
      </div>

      {/* Navigation */}
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
              <Link 
                href="/"
                onClick={handleLogout}
                className="bg-white text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition-colors text-base font-normal"
              >
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="text-white text-base font-normal">
              <Link href="/register">Registrieren</Link>
            </li>
            <li>
              <Link href="/login" className="bg-white text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition-colors text-base font-normal">
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
