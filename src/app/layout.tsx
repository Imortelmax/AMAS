import Navbar from "@/components/layout/navbar";
import { Open_Sans } from 'next/font/google';
import "./globals.css";

const openSans = Open_Sans({
  subsets:["latin"],
  display: "swap",
  variable: "--font-open-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={openSans.variable}>
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}