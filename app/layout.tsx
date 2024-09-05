import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/navbar";
import { Suspense } from "react";
import { UserProvider } from "@auth0/nextjs-auth0/client";

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
        <UserProvider>
          <Navbar />
          <Suspense>
            <main>{children}</main>
          </Suspense>
        </UserProvider>
      </body>
    </html>
  );
}
