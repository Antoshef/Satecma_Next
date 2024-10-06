import { useEffect, useState, useMemo } from "react";
import { AdditionalServices, Package, Receiver, Sender } from "./types";
import {
  INIT_SENDER,
  INIT_RECEIVER,
  INIT_PACKAGE,
  INIT_ADDITIONAL_SERVICES,
} from "./constants";

export const useCreateEcontPackage = () => {
  const cities: { name: string; id?: number }[] = [];
  const offices = useMemo<{ name: string; address?: { city?: { id?: number } } }[]>(() => [], []);
  const [sender, setSender] = useState<Sender>(INIT_SENDER);
  const [receiver, setReceiver] = useState<Receiver>(INIT_RECEIVER);
  const [packageData, setPackageData] = useState<Package>(INIT_PACKAGE);
  const [additionalServices, setAdditionalServices] =
    useState<AdditionalServices>(INIT_ADDITIONAL_SERVICES);

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
        (office) => office?.address?.city?.id === sender.city?.id,
      ),
    }));
  }, [sender.city, offices]);

  useEffect(() => {
    setReceiver((state) => ({
      ...state,
      currentCityOffices: offices.filter(
        (office) => office?.address?.city?.id === receiver.city?.id,
      ),
    }));
  }, [offices, receiver.city]);

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
