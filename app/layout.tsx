import type { Metadata } from "next";
import "./globals.css";
import dynamic from "next/dynamic";

const ClientProviders = dynamic(() => import("./ClientProviders"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Satecma - Industrias Químicas S.A.",
  description: "The storage app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
