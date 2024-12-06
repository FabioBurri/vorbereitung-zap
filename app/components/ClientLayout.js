'use client';

import { SessionProvider } from 'next-auth/react';
import Navbar from "./Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>
        <SessionProviderWrapper>
          <Navbar />
            <main>{children}</main>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}