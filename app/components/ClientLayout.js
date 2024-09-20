'use client';

import SessionProviderWrapper from "./SessionProviderWrapper";
import Navbar from "./Navbar";

export default function ClientLayout({ children }) {
  return (
    <SessionProviderWrapper>
      <Navbar />
      <main>{children}</main>
    </SessionProviderWrapper>
  );
}