import { UserProvider } from "@auth0/nextjs-auth0/client";
import type { Metadata } from "next";
import { Suspense } from "react";
import SidePanel from "./components/sidePanel";
import "./globals.css";

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
      <body className="h-full">
        <UserProvider>
          <div className="flex h-full">
            <SidePanel />
            <div className="flex-1 relative overflow-y-auto">
              <Suspense>
                <main className="p-4">{children}</main>
              </Suspense>
            </div>
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
