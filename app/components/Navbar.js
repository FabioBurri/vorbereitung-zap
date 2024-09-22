'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex justify-end items-center space-x-8">
        {session ? (
          <li className="text-white">
            <button onClick={() => signOut()}>Logout</button>
          </li>
        ) : (
          <>
            {}
            <li className="text-white">
              <Link href="/register">Registrieren</Link>
            </li>
            <li>
              <Link href="/login" className="bg-white text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition-colors">
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
