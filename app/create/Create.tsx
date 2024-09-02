"use client";
import { useEffect, useMemo, useState } from "react";
import { Product } from "./invoice/types";
import { InvoiceWrapper } from "./invoice/wrapper";
import { OfferWrapper } from "./offer/wrapper";
import { Client } from "@/clients/utils/types";

interface Props {
  products: Product[];
  clients: Client[];
  invoiceIds: {
    current: string;
    previous: string;
    proforma: string;
  };
}

export function Create({ products, clients, invoiceIds }: Props) {
  const [currentHash, setCurrentHash] = useState<string>("#");

  const Component = useMemo(() => {
    switch (currentHash) {
      case "#offer":
        return <OfferWrapper products={products} />;
      default:
        return (
          <InvoiceWrapper
            products={products}
            clients={clients}
            invoiceIds={invoiceIds}
          />
        );
    }
  }, [currentHash, products, invoiceIds]);

  useEffect(() => {
    setCurrentHash(window.location.hash);

    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return <main>{Component}</main>;
}
