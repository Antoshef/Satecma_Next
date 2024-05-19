"use client";
import StoreProvider from "@/StoreProvider";
import Header from ".";

export default function HeaderWrapper() {
  return (
    <StoreProvider>
      <Header />
    </StoreProvider>
  );
}
