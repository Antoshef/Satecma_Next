import { CompanyContext } from "@/components/providers/companyProvider";
import useToast from "@/store/utils/useToast";
import { fetchData } from "@/utils/fetchData";
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
  InvoiceIdType,
  InvoiceType,
  Item,
  LatestInvoices,
  ProductData,
  Provider,
} from "./types";
import { getInvoiceNumber } from "./utils";

interface InvoiceWrapperProps {
  data: ProductData[];
}

export const InvoiceWrapper = ({ data }: InvoiceWrapperProps) => {
  const [email, setEmail] = useState("");
  const [sendMailToRecepient, setSendMailToRecepient] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [latestInvoiceNumbers, setLatestInvoiceNumbers] =
    useState<LatestInvoices>({
      current: "0000100000",
      previous: "0000000000",
      manual: "",
    });
  const [invoiceIdType, setInvoiceIdType] = useState<InvoiceIdType>(
    InvoiceIdType.current
  );
  const [invoiceType, setInvoiceType] = useState<InvoiceType>(
    InvoiceType.proforma
  );
  const [provider, setProvider] = useState<Provider>(ECOHOME_COMPANY);
  const invoiceRef = useRef<HTMLTableElement>(null);
  const [isFieldsDisabled, setIsFieldsDisabled] = useState<boolean>(false);
  const [items, setItems] = useState<Item[]>([]);
  const [invoiceData, setInvoiceData] = useState<InvoiceData>(
    INVOICE_DATA_DEFAULT_VALUES
  );
  const { Toast, setMessage } = useToast();
  const { company } = useContext(CompanyContext);

  const invoiceNumber = useMemo(() => {
    return invoiceIdType === InvoiceIdType.manual
      ? latestInvoiceNumbers.manual || ""
      : invoiceIdType === InvoiceIdType.current
      ? latestInvoiceNumbers.current
      : latestInvoiceNumbers.previous;
  }, [invoiceIdType, latestInvoiceNumbers]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsFieldsDisabled(true);
    const css = await fetch("/globals.css").then((res) => res.text());

    try {
      if (invoiceType === InvoiceType.invoice && items.length) {
        await fetchData("/api/create/invoice-sent", {
          method: "POST",
          body: JSON.stringify(invoiceData),
        });

        await fetchData("/api/storage/update", {
          method: "PUT",
          body: JSON.stringify({ items }),
        });
      }

      await fetchData("/api/create/invoice", {
        method: "POST",
        body: JSON.stringify({
          email,
          invoiceNumber,
          html: invoiceRef.current?.outerHTML,
          css,
          sendMailToRecepient,
          invoiceType,
          providerName: provider.name,
          client: invoiceData.client,
        }),
      });

      setMessage({
        text: "Фактурата е създадена успешно!",
        severity: "success",
      });
    } catch (error) {
      setMessage({
        text: "Възникна грешка при създаването на фактурата.",
        severity: "error",
      });
      setIsFieldsDisabled(false);
    }
  };

  useEffect(() => {
    fetchData<InvoiceData[]>("/api/create/invoice-sent")
      .then((data) => {
        const { current, previous } = getInvoiceNumber(data.data);
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
      <Toast />
      <InvoiceBox
        provider={provider}
        products={data}
        invoiceNumber={invoiceNumber}
        ref={invoiceRef}
        isFieldsDisabled={isFieldsDisabled}
        invoiceData={invoiceData}
        invoiceIdType={invoiceIdType}
        invoiceType={invoiceType}
        setEmail={setEmail}
        setError={setError}
        submitItems={setItems}
        setInvoiceData={setInvoiceData}
        setInvoiceType={setInvoiceType}
        setInvoiceIdType={setInvoiceIdType}
        setLatestInvoiceNumbers={setLatestInvoiceNumbers}
      />
      <Grid container margin={2} justifyContent="center" alignItems="center">
        <Grid
          item
          className="cursor-pointer"
          onClick={() => setSendMailToRecepient(!sendMailToRecepient)}
        >
          <Checkbox
            checked={sendMailToRecepient}
            inputProps={{ "aria-label": "controlled" }}
          />
          <Typography component="span" variant="body2">
            Изпрати до получател
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
