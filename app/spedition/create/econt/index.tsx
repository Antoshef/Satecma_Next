import { PackageDataFields } from "./packageDataFields";
import { ReceiverFields } from "./receiverFields";
import { AdditionalServices } from "./additionalServices";
import { Button } from "@mui/material";
import { FormEvent } from "react";

export const CreateEcontPackage = () => {
  const submitHandler = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col gap-4 justify-center align-middle"
    >
      <ReceiverFields />
      <PackageDataFields />
      <AdditionalServices />
      <Button type="submit" className="w-44 self-center" variant="contained">
        Създай
      </Button>
    </form>
  );
};
