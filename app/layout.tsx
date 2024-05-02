import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import Header from "./components/header/header";
import "./globals.css";

const CompanyProvider = dynamic(
  () => import("./components/providers/companyProvider"),
  {
    ssr: false,
  }
);

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <CompanyProvider>
          <Header />
          {children}
        </CompanyProvider>
      </body>
    </html>
  );
}
