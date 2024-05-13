import { PackageDataFields } from "./packageDataFields";
import { ReceiverFields } from "./receiverFields";
import { AdditionalServices } from "./additionalServices";
import { Button } from "@mui/material";
import { FormEvent, useState } from "react";
import { useCreateEcontPackage } from "./useCreateEcontPackage";
import { createLabel } from "./services/utils";
import { SenderFields } from "./senderFields";

export const CreateEcontPackage = () => {
  const [isAddressUsed, setIsAddressUsed] = useState(false);
  const {
    sender,
    receiver,
    cities,
    setSender,
    setReceiver,
  } = useCreateEcontPackage();

  const submitHandler = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    const result = createLabel(receiver)
      .then((res) => {
        console.log(res, "res");
        return res;
      })
      .catch((err) => err);
    console.log(result, "submit");
  };

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col gap-4 justify-center align-middle"
    >
      <SenderFields {...sender} cities={cities} setSender={setSender} />
      <ReceiverFields
        {...receiver}
        cities={cities}
        isAddressUsed={isAddressUsed}
        setIsAddressUsed={setIsAddressUsed}
        setReceiver={setReceiver}
      />
      <PackageDataFields />
      <AdditionalServices />
      <Button type="submit" className="w-44 self-center" variant="contained">
        Създай
      </Button>
    </form>
  );
};
