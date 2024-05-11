import { useEffect, useState } from "react";
import {
  AdditionalServices,
  EcontCity,
  EcontOffice,
  Package,
  Receiver,
} from "./types";
import { EcontRestClient } from "@/utils/econtRestClient";

export const useCreateEcontPackage = () => {
  const [cities, setCities] = useState<EcontCity[]>([]);
  const [offices, setOffices] = useState<EcontOffice[]>([]);
  const [currentCityOffices, setCurrentCityOffices] = useState<EcontOffice[]>(
    []
  );
  const [selectedOffice, setSelectedOffice] = useState<EcontOffice | null>(
    null
  );
  const [selectedCity, setSelectedCity] = useState<EcontCity | null>(null);
  const [receiver, setReceiver] = useState<Receiver>({
    name: "",
    phone: "",
    country: "България",
    city: "",
    email: "",
    zipCode: "",
    office: "",
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

  const getCities = async () => {
    EcontRestClient.request(
      "Nomenclatures/NomenclaturesService.getCities.json",
      { countryCode: "BG" }
    )
      .then((res) => setCities(res.cities))
      .catch((error) => console.error(error));
  };

  const getOffices = async () => {
    EcontRestClient.request(
      "Nomenclatures/NomenclaturesService.getOffices.json"
    )
      .then((res) => {
        setCurrentCityOffices(res.offices);
        setOffices(res.offices);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getCities();
    getOffices();
  }, []);

  useEffect(() => {
    setCurrentCityOffices(
      offices.filter((office) => office.address.city.id === selectedCity?.id)
    );
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
