import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import "./favicon.ico";
import StoreProvider from "~/redux/StoreProvider";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Realm. - Media Pembelajaran Berbasis Website Berbantuan Next.JS Framework untuk Meningkatkan Penguasaan Materi Relativitas",
  description:
    "Realms adalah media pembelajaran yang dirancang untuk mempermudah siswa dalam memahami dan mengaplikasikan materi relativitas (khusus).",
  authors: {
    name: "Rizqon Maulana",
    url: "http://github.com/rizzzdev",
  },
  applicationName: "Realms.",
  category: "Pendidikan, Edukasi",
  keywords:
    "media pembelajaran, website pembelajaran, media berbasis website, e-learning, relativitas khusus",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StoreProvider>
        <body
          className={`
          ${poppins.variable} font-poppins
          antialiased bg-background`}
        >
          {children}
        </body>
      </StoreProvider>
    </html>
  );
}
