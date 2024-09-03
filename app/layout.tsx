import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/navbar";
import { Suspense } from "react";
import LoadingDots from "./loading";

export const metadata: Metadata = {
  title: "Satecma - Industrias Químicas S.A.",
  description: "The storage app",
  robots: {
    follow: true,
    index: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <Suspense fallback={<LoadingDots className="bg-gray-500" />}>
          <main>{children}</main>
        </Suspense>
      </body>
    </html>
  );
}
