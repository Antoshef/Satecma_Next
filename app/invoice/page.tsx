"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Button, Checkbox, Grid, Typography } from "@mui/material";
import { ProductData } from "@/components/invoice/types";
import { InvoiceBox } from "@/components/invoice/InvoiceBox";
import { fetchJson } from "@/utils/fetchJson";
import { ECOHOME_COMPANY } from "@/components/invoice/constants";
import "@/components/invoice/invoiceBox.css";
import "./invoice.css";

export default function Invoice() {
  const [data, setData] = useState<ProductData[]>([]);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<boolean>(true);
  const [invoiceNumber, setInvoiceNumber] = useState<number>(500000001);
  const [provider, setProvider] = useState(ECOHOME_COMPANY);
  const invoiceRef = useRef<HTMLTableElement>(null);
  const [isFieldsDisabled, setIsFieldsDisabled] = useState<boolean>(false);
  const [accountantCopy, setAccountantCopy] = useState<boolean>(false);
  const [officeCopy, setOfficeCopy] = useState<boolean>(true);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsFieldsDisabled(true);
    const bcc = [];
    if (accountantCopy) {
      bcc.push(
        provider.name === "Сатекма ЕООД"
          ? process.env.NEXT_PUBLIC_SATECMA_ACCOUNTANT_EMAIL
          : provider.name === "Еко Хоум Трейд ЕООД"
          ? process.env.NEXT_PUBLIC_ECO_HOME_ACCOUNTANT_EMAIL
          : ""
      );
    }
    if (officeCopy) {
      bcc.push(process.env.NEXT_PUBLIC_OFFICE_EMAIL);
    }
    const css = await fetch("/invoiceBox.css").then((res) => res.text());
    fetch("/api/generate-invoice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bcc,
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
        provider={provider}
        products={data}
        invoiceNumber={invoiceNumber}
        ref={invoiceRef}
        isFieldsDisabled={isFieldsDisabled}
        setEmail={setEmail}
        setError={setError}
        setProvider={setProvider}
      />
      <Grid container margin={2} justifyContent="center" alignItems="center">
        <Grid
          item
          className="invoice__item"
          onClick={() => setAccountantCopy(!accountantCopy)}
        >
          <Checkbox
            checked={accountantCopy}
            inputProps={{ "aria-label": "controlled" }}
          />
          <Typography component="span" variant="body2">
            Изпрати копие до счетоводител
          </Typography>
        </Grid>
        <Grid
          item
          className="invoice__item"
          onClick={() => setOfficeCopy(!officeCopy)}
        >
          <Checkbox
            checked={officeCopy}
            inputProps={{ "aria-label": "controlled" }}
          />
          <Typography component="span" variant="body2">
            Изпрати копие до офис
          </Typography>
        </Grid>
      </Grid>
      <div className="invoiceForm__button">
        <Button variant="contained" disabled={error} type="submit">
          Generate Invoice
        </Button>
      </div>
    </form>
  );
}
