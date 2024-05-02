"use client";
import { useEffect, useMemo, useState } from "react";
import { InvoiceWrapper } from "./invoice/wrapper";
import { OfferWrapper } from "./offer/wrapper";
import { ProductData } from "./invoice/types";
import { fetchJson } from "@/utils/fetchJson";

export default function Page() {
  const [data, setData] = useState<ProductData[]>([]);
  const [currentHash, setCurrentHash] = useState<string>(window.location.hash);

  useEffect(() => {
    fetchJson<ProductData[]>("/api/get-prices")
      .then((res) => {
        setData(res.data.length ? res.data : []);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const Component = useMemo(() => {
    switch (currentHash) {
      case "#invoice":
        return <InvoiceWrapper data={data} />;
      case "#offer":
        return <OfferWrapper data={data} />;
      default:
        return <OfferWrapper data={data} />;
    }
  }, [currentHash, data]);

  useEffect(() => {
    window.addEventListener("hashchange", () => {
      setCurrentHash(window.location.hash);
    });
  });

  return <div>{Component}</div>;
}
