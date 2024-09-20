'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex justify-between items-center">
        {}
        <li className="text-white">
          <Link href="/">Home</Link>
        </li>

        {}
        {session ? (
          <li className="text-white">
            <button onClick={() => signOut()}>Logout</button>
          </li>
        ) : (
          <>
            {}
            <li className="text-white">
              <Link href="/login">Login</Link>
            </li>
            <li className="text-white">
              <Link href="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
