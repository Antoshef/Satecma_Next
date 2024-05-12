import { PackageDataFields } from "./packageDataFields";
import { ReceiverFields } from "./receiverFields";
import { AdditionalServices } from "./additionalServices";
import { Button } from "@mui/material";
import { FormEvent } from "react";
import { EcontRestClient } from "./econtRestClient";
import { ShippingLabel } from "./services/shipments/types";
import { useAppSelector } from "../../../../lib/hooks";

export const CreateEcontPackage = () => {
  

  // const validateAddress = async () => {
  //   const isAddressValid = EcontRestClient.request(
  //     "Nomenclatures/AddressService.validateAddress.json",
  //     { city: receiver.city, street: receiver.address, num: receiver.num }
  //   );
  //   return isAddressValid;
  // };

  const createLabel = async () => {
    const label = EcontRestClient.request<{ label: ShippingLabel }>(
      "Shipments/LabelService.createLabel.json"
      // {
      //   label: {
      //     receiverClient: {
      //       name: receiver.name,
      //       phones: [receiver.phone],
      //       email: receiver.email,
      //     },
      //     receiverAddress: {
      //       // city: receiver.city,
      //       // street: receiver.address,
      //       // num: receiver.num,
      //     },
      //     receiverOfficeCode: receiver.officeCode,
      //   },
      // }
    );
    return label;
  };

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
