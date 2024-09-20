import localFont from "next/font/local";
import "./globals.css";
import ClientLayout from "./components/ClientLayout";

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
    <html lang="de">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}