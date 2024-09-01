"use client";

import { Inter } from "next/font/google";
import StoreProvider from "./StoreProvider";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Header from "./components/header";

const inter = Inter({ subsets: ["latin"] });

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <StoreProvider>
        <div className={inter.className}>
          <Header />
          {children}
        </div>
      </StoreProvider>
    </UserProvider>
  );
}
