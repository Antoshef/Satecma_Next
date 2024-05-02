import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { Item, ProductData } from "../invoice/types";
import { generateBcc, POSTinvoicePdf } from "../invoice/utils";
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
  const [email, setEmail] = useState("");
  const [error, setError] = useState<boolean>(true);
  const [provider, setProvider] = useState(ECOHOME_COMPANY);
  const offerRef = useRef<HTMLTableElement>(null);
  const [isFieldsDisabled, setIsFieldsDisabled] = useState<boolean>(false);
  const [officeCopy, setOfficeCopy] = useState<boolean>(false);
  const [items, setItems] = useState<Item[]>([]);
  const { company } = useContext(CompanyContext);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsFieldsDisabled(true);
    const bcc = generateBcc({ officeCopy });
    const css = await fetch("/invoiceBox.css").then((res) => res.text());
    await POSTinvoicePdf(bcc, email, "0", offerRef.current?.outerHTML, css);
  };

  useEffect(() => {
    setProvider(
      company === Company.ekoHome ? ECOHOME_COMPANY : SATECMA_COMPANY
    );
  }, [company]);

  return (
    <form className="p-4" onSubmit={onSubmit} id="offer">
      <OfferBox provider={provider} ref={offerRef} />
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
          Създай оферта
        </Button>
      </div>
    </form>
  );
};
