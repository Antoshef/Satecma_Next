import { PackageDataFields } from "./packageDataFields";
import { ReceiverFields } from "./receiverFields";
import { AdditionalServices } from "./additionalServices";
import { Button } from "@mui/material";
import { FormEvent, useState } from "react";
import { useCreateEcontPackage } from "./useCreateEcontPackage";
import { createLabel } from "./services/utils";

export const CreateEcontPackage = () => {
  const [isAddressUsed, setIsAddressUsed] = useState(false);
  const {
    receiver,
    currentCityOffices: offices,
    cities,
    selectedCity,
    selectedOffice,
    setReceiver,
    setSelectedCity,
    setSelectedOffice,
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
      <ReceiverFields
        {...receiver}
        cities={cities}
        offices={offices}
        selectedCity={selectedCity}
        selectedOffice={selectedOffice}
        isAddressUsed={isAddressUsed}
        setIsAddressUsed={setIsAddressUsed}
        setReceiver={setReceiver}
        setSelectedCity={setSelectedCity}
        setSelectedOffice={setSelectedOffice}
      />
      <PackageDataFields />
      <AdditionalServices />
      <Button type="submit" className="w-44 self-center" variant="contained">
        Създай
      </Button>
    </form>
  );
};
