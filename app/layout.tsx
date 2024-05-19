import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import StoreProvider from "./StoreProvider";
import { fetchData } from "./utils/fetchData";
import { Product } from "./create/invoice/types";

const HeaderWrapper = dynamic(() => import("./components/header/wrapper"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Satecma - Industrias Químicas S.A.",
  description: "The storage app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <HeaderWrapper />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
