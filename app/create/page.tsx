"use client";
import { useEffect, useMemo, useState } from "react";
import { ProductData } from "./invoice/types";
import { InvoiceWrapper } from "./invoice/wrapper";
import { OfferWrapper } from "./offer/wrapper";

interface Props {
  data: ProductData[];
  invoiceIds: {
    current: string;
    previous: string;
  };
}

export default function CreatePage({ data, invoiceIds }: Props) {
  const [currentHash, setCurrentHash] = useState<string>(window.location.hash);

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
    window.addEventListener("hashchange", () => {
      setCurrentHash(window.location.hash);
    });
  });

  return <div>{Component}</div>;
}
