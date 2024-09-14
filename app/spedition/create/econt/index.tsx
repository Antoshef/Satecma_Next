import { PackageDataFields } from "./packageDataFields";
import { ReceiverFields } from "./receiverFields";
import { AdditionalServices } from "./additionalServices";
import { FormEvent, useState } from "react";
import { useCreateEcontPackage } from "./useCreateEcontPackage";
import { EcontUtils } from "./services/utils";
import { SenderFields } from "./senderFields";

export const CreateEcontPackage = () => {
  const [isAddressUsed, setIsAddressUsed] = useState(false);
  const { sender, receiver, cities, setSender, setReceiver } =
    useCreateEcontPackage();

  const submitHandler = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    const result = EcontUtils.createLabel(receiver)
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
      <button
        type="submit"
        className="w-44 self-center bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Създай
      </button>
    </form>
  );
};
