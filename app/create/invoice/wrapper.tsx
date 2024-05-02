import { fetchJson } from "@/utils/fetchJson";
import { Button, Checkbox, Grid, Typography } from "@mui/material";
import {
  FormEvent,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { InvoiceBox } from ".";
import {
  Company,
  ECOHOME_COMPANY,
  INVOICE_DATA_DEFAULT_VALUES,
  SATECMA_COMPANY,
} from "./constants";
import {
  InvoiceData,
  InvoiceType,
  Item,
  LatestInvoices,
  ProductData,
  Provider,
} from "./types";
import {
  generateBcc,
  getInvoiceNumber,
  POSTinvoiceData,
  POSTinvoicePdf,
  UPDATEstoreData,
} from "./utils";
import { CompanyContext } from "@/components/providers/companyProvider";

interface InvoiceWrapperProps {
  data: ProductData[];
}

export const InvoiceWrapper = ({ data }: InvoiceWrapperProps) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<boolean>(false);
  const [latestInvoiceNumbers, setLatestInvoiceNumbers] =
    useState<LatestInvoices>({
      current: "0000100000",
      previous: "0000000000",
      manual: "",
    });
  const [currentInvoiceType, setCurrentInvoiceType] = useState<InvoiceType>(
    InvoiceType.current
  );
  const [provider, setProvider] = useState<Provider>(ECOHOME_COMPANY);
  const invoiceRef = useRef<HTMLTableElement>(null);
  const [isFieldsDisabled, setIsFieldsDisabled] = useState<boolean>(false);
  const [accountantCopy, setAccountantCopy] = useState<boolean>(false);
  const [officeCopy, setOfficeCopy] = useState<boolean>(false);
  const [items, setItems] = useState<Item[]>([]);
  const [invoiceData, setInvoiceData] = useState<InvoiceData>(
    INVOICE_DATA_DEFAULT_VALUES
  );
  const { company } = useContext(CompanyContext);

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
    const bcc = generateBcc({
      accountantCopy,
      officeCopy,
      providerName: provider.name,
    });
    const css = await fetch("/globals.css").then((res) => res.text());
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

  useEffect(() => {
    setProvider(
      company === Company.ekoHome ? ECOHOME_COMPANY : SATECMA_COMPANY
    );
  }, [company]);

  return (
    <form className="p-4" onSubmit={onSubmit} id="invoice">
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
          Създай
        </Button>
      </div>
    </form>
  );
};
