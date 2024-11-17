import localFont from "next/font/local";
import "./globals.css";
import ClientLayout from "./components/ClientLayout";
import Navbar from "./components/Navbar";
import SessionWrapper from "./components/SessionWrapper";
import Head from "next/head";

export const metadata = {
  title: 'Vorbereitung ZAP',
  description: 'Plattform zur Vorbereitung für die Zentrale Aufnahmeprüfung',
  icons: {
    icon: '/favicon.png',
  },
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
        <Head>
          {/* Standard Favicon */}
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />

          {/* Apple Touch Icons */}
          <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png" />
          <link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-60x60.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png" />
          <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png" />
          <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png" />
          <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png" />
          <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png" />

          {/* Android Icons */}
          <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />

          {/* Microsoft Tiles */}
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="msapplication-TileImage" content="/mstile-150x150.png" />

          {/* Page Metadata */}
          <meta name="description" content="Plattform zur Vorbereitung für die Zentrale Aufnahmeprüfung" />
        </Head>
        <body className={geistSans.variable}>
          <Navbar />
          {children}
        </body>
      </html>
    </SessionWrapper>
  );
}
