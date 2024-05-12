import { useEffect, useState } from "react";
import { AdditionalServices, Package, Receiver } from "./types";
import { City, Office } from "./services/shipments/types";
import { useAppSelector } from "../../../../lib/hooks";

export const useCreateEcontPackage = () => {
  const [currentCityOffices, setCurrentCityOffices] = useState<Office[]>([]);
  const [selectedOffice, setSelectedOffice] = useState<Office | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const cities = useAppSelector((state) => state.econt.cities);
  const offices = useAppSelector((state) => state.econt.offices);

  const [receiver, setReceiver] = useState<Receiver>({
    name: "",
    phone: "",
    country: "България",
    city: {},
    email: "",
    office: {},
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

  useEffect(() => {
    setCurrentCityOffices(
      offices.filter((office) => office?.address?.city?.id === selectedCity?.id)
    );
  }, [selectedCity]);

  useEffect(() => {
    setReceiver((state) => ({
      ...state,
      office: selectedOffice || {},
    }));
  }, [selectedOffice]);

  useEffect(() => {
    setReceiver((state) => ({
      ...state,
      city: selectedCity || {},
      postCode: selectedCity?.postCode,
    }));
  }, [selectedCity]);

  return {
    currentCityOffices,
    cities,
    receiver,
    setReceiver,
    packageData,
    setPackageData,
    additionalServices,
    setAdditionalServices,
    selectedOffice,
    setSelectedOffice,
    selectedCity,
    setSelectedCity,
  };
};
