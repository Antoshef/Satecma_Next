"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import { ProductData } from "@/components/invoice/types";
import { InvoiceBox } from "@/components/invoice/InvoiceBox";
import { fetchJson } from "@/utils/fetchJson";
import "@/components/invoice/invoiceBox.css";

export default function Invoice() {
  const [data, setData] = useState<ProductData[]>([]);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<boolean>(true);
  const [invoiceNumber, setInvoiceNumber] = useState<number>(500000001);
  const invoiceRef = useRef<HTMLTableElement>(null);
  const [isFieldsDisabled, setIsFieldsDisabled] = useState<boolean>(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsFieldsDisabled(true);
    const css = await fetch("/invoiceBox.css").then((res) => res.text());
    fetch("/generate-invoice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        invoiceNumber,
        html: invoiceRef.current?.outerHTML,
        css,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        // setIsFieldsDisabled(false);
      });
  };

  useEffect(() => {
    fetchJson<ProductData[]>("/api/get-prices")
      .then((data) => {
        setData(data.length ? data : []);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <form onSubmit={onSubmit} id="invoiceForm">
      <InvoiceBox
        products={data}
        invoiceNumber={invoiceNumber}
        ref={invoiceRef}
        isFieldsDisabled={isFieldsDisabled}
        setEmail={setEmail}
        setError={setError}
      />
      <div className="invoiceForm__button">
        <Button variant="contained" disabled={error} type="submit">
          Generate Invoice
        </Button>
      </div>
    </form>
  );
}
