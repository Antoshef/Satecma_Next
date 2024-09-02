import useToast from "@/store/utils/useToast";
import { fetchData } from "@/utils/fetchData";
import { Button } from "@mui/material";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { OfferBox } from ".";
import {
  Company,
  ECOHOME_COMPANY,
  SATECMA_COMPANY,
} from "../invoice/constants";
import { Product } from "../invoice/types";
import { CompanyContext } from "@/ClientProviders";

interface OfferWrapperProps {
  data: Product[];
}

export const OfferWrapper = ({ data }: OfferWrapperProps) => {
  const [error, setError] = useState<boolean>(false);
  const [provider, setProvider] = useState(ECOHOME_COMPANY);
  const offerRef = useRef<HTMLTableElement>(null);
  const [isFieldsDisabled, setIsFieldsDisabled] = useState<boolean>(false);
  const [heading, setHeading] = useState("Заглавие на офертата");
  const { company } = useContext(CompanyContext);
  const { Toast, setMessage } = useToast();
  const [recipient, setRecipient] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsFieldsDisabled(true);
    const css = await fetch("/globals.css").then((res) => res.text());
    try {
      await fetchData("/api/create/offer", {
        method: "POST",
        body: JSON.stringify({
          email: recipient.email,
          name: recipient.name,
          html: offerRef.current?.outerHTML,
          css,
          providerName: provider.name,
          heading,
        }),
      });
      setMessage({
        severity: "success",
        text: "Офертата беше успешно изпратена.",
      });
    } catch (error) {
      setMessage({
        severity: "error",
        text: "Грешка при изпращането на офертата.",
      });
    }
  };

  useEffect(() => {
    setProvider(
      company === Company.ekoHome ? ECOHOME_COMPANY : SATECMA_COMPANY,
    );
  }, [company]);

  return (
    <form className="p-4" onSubmit={onSubmit} id="offer">
      <Toast />
      <OfferBox
        heading={heading}
        isFieldsDisabled={isFieldsDisabled}
        products={data}
        provider={provider}
        ref={offerRef}
        recipient={recipient}
        setRecipient={setRecipient}
        setHeading={setHeading}
      />
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
