import { useEffect, useState } from "react";
import { AdditionalServices, Package, Receiver, Sender } from "./types";
import { Office } from "./services/shipments/types";
import { useAppSelector } from "../../../../lib/hooks";

export const useCreateEcontPackage = () => {
  const cities = useAppSelector((state) => state.econt.cities);
  const offices = useAppSelector((state) => state.econt.offices);

  const [sender, setSender] = useState<Sender>({
    name: "",
    city: {},
    office: {},
    currentCityOffices: [],
  });
  const [receiver, setReceiver] = useState<Receiver>({
    name: "",
    phone: "",
    country: "България",
    city: {},
    email: "",
    office: {},
    address: undefined,
    currentCityOffices: [],
  });
  const [packageData, setPackageData] = useState<Package>({
    quantity: 1,
    weight: "",
    type: "Писмо",
    dimensions: {
      width: "",
      height: "",
      length: "",
    },
    description: "",
    id: "",
    isFragile: false,
    isLessThan60cm: false,
    volume: "",
  });
  const [additionalServices, setAdditionalServices] =
    useState<AdditionalServices>({
      price: "",
      cashOnDelivery: {
        payer: "",
        amount: "",
      },
      paymentType: "",
      twoWayDelivery: false,
      SMSNotification: false,
      coolingBag: false,
      invoiceId: "",
      stretchFoil: false,
      borrowPallet: false,
      stretchFoilPacking: false,
    });

  const senderCityHandler = (name: string) => {
    const city = cities.find((c) => c.name === name);
    setSender((state) => ({
      ...state,
      city: city || {},
    }));
  };

  const senderOfficeHandler = (name: string) => {
    const office = offices.find((o) => o.name === name);
    setSender((state) => ({
      ...state,
      office: office || {},
    }));
  };

  const receiverCityHandler = (name: string) => {
    const city = cities.find((c) => c.name === name);
    setReceiver((state) => ({
      ...state,
      city: city || {},
    }));
  };

  const receiverOfficeHandler = (name: string) => {
    const office = offices.find((o) => o.name === name);
    setReceiver((state) => ({
      ...state,
      office: office || {},
    }));
  };

  useEffect(() => {
    setSender((state) => ({
      ...state,
      currentCityOffices: offices.filter(
        (office) => office?.address?.city?.id === sender.city?.id
      ),
    }));
  }, [sender.city]);

  useEffect(() => {
    setReceiver((state) => ({
      ...state,
      currentCityOffices: offices.filter(
        (office) => office?.address?.city?.id === receiver.city?.id
      ),
    }));
  }, [receiver.city]);

  return {
    sender,
    cities,
    receiver,
    packageData,
    additionalServices,
    setSender,
    setReceiver,
    setPackageData,
    setAdditionalServices,
    senderCityHandler,
    senderOfficeHandler,
    receiverCityHandler,
    receiverOfficeHandler,
  };
};
