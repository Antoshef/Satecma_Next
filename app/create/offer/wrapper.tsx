import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { ProductData } from "../invoice/types";
import { generateBcc, POSTofferPdf } from "../invoice/utils";
import {
  Company,
  ECOHOME_COMPANY,
  SATECMA_COMPANY,
} from "../invoice/constants";
import { Button, Checkbox, Grid, Typography } from "@mui/material";
import { OfferBox } from ".";
import { CompanyContext } from "@/components/providers/companyProvider";

interface OfferWrapperProps {
  data: ProductData[];
}

export const OfferWrapper = ({ data }: OfferWrapperProps) => {
  const [error, setError] = useState<boolean>(false);
  const [provider, setProvider] = useState(ECOHOME_COMPANY);
  const offerRef = useRef<HTMLTableElement>(null);
  const [isFieldsDisabled, setIsFieldsDisabled] = useState<boolean>(false);
  const [officeCopy, setOfficeCopy] = useState<boolean>(false);
  const { company } = useContext(CompanyContext);
  const [recipient, setRecipient] = useState({
    name: "Станев",
    phone: "",
    email: "anton.stanev@satecma.bg",
  });

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsFieldsDisabled(true);
    const bcc = generateBcc({ officeCopy });
    const css = await fetch("/globals.css").then((res) => res.text());
    await POSTofferPdf(
      bcc,
      recipient.email,
      recipient.name,
      offerRef.current?.outerHTML,
      css
    );
  };

  useEffect(() => {
    setProvider(
      company === Company.ekoHome ? ECOHOME_COMPANY : SATECMA_COMPANY
    );
  }, [company]);

  return (
    <form className="p-4" onSubmit={onSubmit} id="offer">
      <OfferBox
        isFieldsDisabled={isFieldsDisabled}
        products={data}
        provider={provider}
        ref={offerRef}
        recipient={recipient}
        setRecipient={setRecipient}
      />
      <Grid container margin={2} justifyContent="center" alignItems="center">
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
