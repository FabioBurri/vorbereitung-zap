import localFont from "next/font/local";
import "./globals.css";
import ClientLayout from "./components/ClientLayout";
import Navbar from "./components/Navbar";
import SessionWrapper from "./components/SessionWrapper";

export const metadata = {
  title: 'Vorbereitung ZAP',
  description: 'Plattform zur Vorbereitung für die Zentrale Aufnahmeprüfung',
};

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  return (
    <SessionWrapper>
      <html lang="de">
        <body className={geistSans.variable}>
          <Navbar />
          {children}
        </body>
      </html>
    </SessionWrapper>
  );
}