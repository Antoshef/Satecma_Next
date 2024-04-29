"use client";
import {
  ECOHOME_COMPANY,
  INVOICE_DATA_DEFAULT_VALUES,
} from "./invoiceBox/constants";
import { InvoiceBox } from "./invoiceBox";
import {
  InvoiceData,
  InvoiceType,
  Item,
  LatestInvoices,
  ProductData,
} from "./invoiceBox/types";
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
      current: "0000100000",
      previous: "0000000000",
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
    const res = await POSTinvoiceData(invoiceData);
    if (res.status !== 200) return;
    const ress = await UPDATEstoreData(items);
    if (ress.status !== 200) return;
    await POSTinvoicePdf(
      bcc,
      email,
      invoiceNumber,
      invoiceRef.current?.outerHTML,
      css
    );
  };

  useEffect(() => {
    fetchJson<ProductData[]>("/api/get-prices")
      .then((res) => {
        setData(res.data.length ? res.data : []);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    fetchJson<InvoiceData[]>("/api/sent-invoice")
      .then((res) => {
        const { current, previous } = getInvoiceNumber(res.data);
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
        <Button
          variant="contained"
          disabled={error || isFieldsDisabled}
          type="submit"
        >
          Generate Invoice
        </Button>
      </div>
    </form>
  );
}
