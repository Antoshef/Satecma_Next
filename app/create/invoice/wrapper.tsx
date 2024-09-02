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
  INIT_RECEIVER,
  INVOICE_DATA_DEFAULT_VALUES,
  SATECMA_COMPANY,
} from "./constants";
import {
  InvoiceData,
  InvoiceIdType,
  InvoiceReceiver,
  InvoiceType,
  Item,
  LatestInvoices,
  Product,
  Provider,
} from "./types";
import { CompanyContext } from "@/ClientProviders";
import { Client } from "@/clients/utils/types";

interface InvoiceWrapperProps {
  products: Product[];
  clients: Client[];
  invoiceIds: {
    current: string;
    previous: string;
    proforma: string;
  };
}

export const InvoiceWrapper = ({
  products,
  clients,
  invoiceIds,
}: InvoiceWrapperProps) => {
  const [email, setEmail] = useState("");
  const [sendMailToRecepient, setSendMailToRecepient] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [receiver, setReceiver] = useState<InvoiceReceiver>(INIT_RECEIVER);
  const [latestInvoiceNumbers, setLatestInvoiceNumbers] =
    useState<LatestInvoices>({
      ...invoiceIds,
      manual: "",
    });
  const [invoiceIdType, setInvoiceIdType] = useState<InvoiceIdType>(
    InvoiceIdType.current,
  );
  const [invoiceType, setInvoiceType] = useState<InvoiceType>(
    InvoiceType.proforma,
  );
  const [provider, setProvider] = useState<Provider>(ECOHOME_COMPANY);
  const invoiceRef = useRef<HTMLTableElement>(null);
  const [isFieldsDisabled, setIsFieldsDisabled] = useState<boolean>(false);
  const [items, setItems] = useState<Item[]>([]);
  const [invoiceData, setInvoiceData] = useState<InvoiceData>(
    INVOICE_DATA_DEFAULT_VALUES,
  );
  const { company } = useContext(CompanyContext);
  const { Toast, setMessage } = useToast();

  const invoiceNumber = useMemo(() => {
    if (invoiceIdType === InvoiceIdType.manual) {
      return latestInvoiceNumbers.manual || "";
    }
    if (invoiceType === InvoiceType.proforma) {
      return latestInvoiceNumbers.proforma;
    }
    if (invoiceIdType === InvoiceIdType.current) {
      return latestInvoiceNumbers.current;
    }
    return latestInvoiceNumbers.previous;
  }, [invoiceIdType, latestInvoiceNumbers, invoiceType]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsFieldsDisabled(true);
    const css = await fetch("/globals.css").then((res) => res.text());

    try {
      await fetchData("/api/create/invoice-sent", {
        method: "POST",
        body: JSON.stringify(invoiceData),
      });

      if (invoiceType === InvoiceType.invoice) {
        if (items.length > 0) {
          await fetchData("/api/products/update", {
            method: "PUT",
            body: JSON.stringify({ items }),
          });
        }
      }
      await fetchData("/api/clients/get", {
        method: "POST",
        body: JSON.stringify({
          name: receiver.company,
          city: receiver.city,
          address: receiver.address,
          eik: receiver.EIK,
          vat: receiver.VAT,
          director: receiver.director,
          email: receiver.email,
          phone: receiver.phone,
        }),
      });

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
    setProvider(
      company === Company.ekoHome ? ECOHOME_COMPANY : SATECMA_COMPANY,
    );
  }, [company]);

  return (
    <form className="p-4" onSubmit={onSubmit} id="invoice">
      <Toast />
      <InvoiceBox
        provider={provider}
        products={products}
        clients={clients}
        invoiceNumber={invoiceNumber}
        ref={invoiceRef}
        isFieldsDisabled={isFieldsDisabled}
        invoiceData={invoiceData}
        invoiceIdType={invoiceIdType}
        invoiceType={invoiceType}
        receiver={receiver}
        setReceiver={setReceiver}
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
