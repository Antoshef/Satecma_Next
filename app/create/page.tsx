"use client";
import StoreProvider from "@/StoreProvider";
import { useEffect, useMemo, useState } from "react";
import { Product } from "./invoice/types";
import { InvoiceWrapper } from "./invoice/wrapper";
import { OfferWrapper } from "./offer/wrapper";

interface Props {
  data: Product[];
  invoiceIds: {
    current: string;
    previous: string;
  };
}

export default function CreatePage({ data, invoiceIds }: Props) {
  const [currentHash, setCurrentHash] = useState<string>("#");

  const Component = useMemo(() => {
    switch (currentHash) {
      case "#invoice":
        return <InvoiceWrapper data={data} invoiceIds={invoiceIds} />;
      case "#offer":
        return <OfferWrapper data={data} />;
      default:
        return <InvoiceWrapper data={data} invoiceIds={invoiceIds} />;
    }
  }, [currentHash, data, invoiceIds]);

  useEffect(() => {
    setCurrentHash(window.location.hash);

    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return <StoreProvider>{Component}</StoreProvider>;
}
