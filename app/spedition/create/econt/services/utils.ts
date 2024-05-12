import { apiRequest } from "@/utils/speedyRestClient";
import { EcontRestClient } from "../econtRestClient";
import { City, Office, Shipment } from "./shipments/types";

export const getCities = async () =>
  EcontRestClient.request("Nomenclatures/NomenclaturesService.getCities.json", {
    countryCode: "BG",
  })
    .then((res) => res.cities as City[])
    .catch((error) => {
      throw new Error(error);
    });

export const getOffices = async () =>
  EcontRestClient.request(
    "Nomenclatures/NomenclaturesService.getOffices.json",
    { countryCode: "BG" }
  )
    .then((res) => res.offices as Office[])
    .catch((error) => {
      throw new Error(error);
    });

export const getClientProfiles = async () => {
  EcontRestClient.request("Profile/ProfileService.getClientProfiles.json")
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
};

export const getShipments = async () => {
  EcontRestClient.request("Shipments/ShipmentService.getMyAWB.json")
    .then((data) => data.results as Shipment[])
    .catch((error) => console.error(error));
};

export const getSpeedyOffices = async () => {
  apiRequest("shipment")
    .then((data) => console.log(data, "DATA"))
    .catch((error) => console.error(error));
};

export const getPaymentReportService = async () => {
  EcontRestClient.request(
    "PaymentReport/PaymentReportService.PaymentReport.json",
    {
      dateFrom: "2024-05-01",
      dateTo: "2024-05-15",
      paymentType: "CASH",
    }
  )
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
};

export const getShipmentStatuses = async () => {
  EcontRestClient.request(
    "Shipments/ShipmentService.getShipmentStatuses.json",
    {}
  )
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
};
