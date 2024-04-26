"use client";
import {
  ECOHOME_COMPANY,
  INVOICE_DATA_DEFAULT_VALUES,
} from "@/invoice/invoiceBox/constants";
import { InvoiceBox } from "@/invoice/invoiceBox";
import {
  InvoiceData,
  InvoiceType,
  Item,
  LatestInvoices,
  ProductData,
} from "@/invoice/invoiceBox/types";
import { fetchJson } from "@/utils/fetchJson";
import { Button, Checkbox, Grid, Typography } from "@mui/material";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import "./styles.css";
import {
  generateBcc,
  getInvoiceNumber,
  POSTinvoiceData,
  POSTinvoicePdf,
  UPDATEstoreData,
} from "./utils";

export default function Page() {
  const [data, setData] = useState<ProductData[]>([]);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<boolean>(true);
  const [latestInvoiceNumbers, setLatestInvoiceNumbers] =
    useState<LatestInvoices>({
      current: "",
      previous: "",
      manual: "",
    });
  const [currentInvoiceType, setCurrentInvoiceType] = useState<InvoiceType>(
    InvoiceType.current
  );
  const [provider, setProvider] = useState(ECOHOME_COMPANY);
  const invoiceRef = useRef<HTMLTableElement>(null);
  const [isFieldsDisabled, setIsFieldsDisabled] = useState<boolean>(false);
  const [accountantCopy, setAccountantCopy] = useState<boolean>(false);
  const [officeCopy, setOfficeCopy] = useState<boolean>(false);
  const [items, setItems] = useState<Item[]>([]);
  const [invoiceData, setInvoiceData] = useState<InvoiceData>(
    INVOICE_DATA_DEFAULT_VALUES
  );

  const invoiceNumber = useMemo(() => {
    return currentInvoiceType === InvoiceType.manual
      ? latestInvoiceNumbers.manual || ""
      : currentInvoiceType === InvoiceType.current
      ? latestInvoiceNumbers.current
      : latestInvoiceNumbers.previous;
  }, [currentInvoiceType, latestInvoiceNumbers]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsFieldsDisabled(true);
    const bcc = generateBcc(accountantCopy, officeCopy, provider.name);
    const css = await fetch("/invoiceBox.css").then((res) => res.text());
    await POSTinvoicePdf(
      bcc,
      email,
      invoiceNumber,
      invoiceRef.current?.outerHTML,
      css
    );
    await POSTinvoiceData(invoiceData);
    await UPDATEstoreData(items);
  };

  useEffect(() => {
    fetchJson<ProductData[]>("/api/get-prices")
      .then((data) => {
        setData(data.length ? data : []);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    fetchJson<InvoiceData[]>("/api/sent-invoice")
      .then((data) => {
        const { current, previous } = getInvoiceNumber(data);
        setLatestInvoiceNumbers((prev) => ({
          ...prev,
          current,
          previous,
        }));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <form onSubmit={onSubmit} id="invoice">
      <InvoiceBox
        provider={provider}
        products={data}
        invoiceNumber={invoiceNumber}
        ref={invoiceRef}
        isFieldsDisabled={isFieldsDisabled}
        invoiceData={invoiceData}
        currentInvoiceType={currentInvoiceType}
        setEmail={setEmail}
        setError={setError}
        setProvider={setProvider}
        submitItems={setItems}
        setInvoiceData={setInvoiceData}
        setCurrentInvoiceType={setCurrentInvoiceType}
        setLatestInvoiceNumbers={setLatestInvoiceNumbers}
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
            Копие до счетоводител
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
            Копие до офис
          </Typography>
        </Grid>
      </Grid>
      <div className="invoice__button">
        <Button variant="contained" disabled={error} type="submit">
          Generate Invoice
        </Button>
      </div>
    </form>
  );
}
