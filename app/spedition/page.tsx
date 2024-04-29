"use client";
import { EcontRestClient } from "@/utils/econtRestClient";
import { apiRequest } from "@/utils/speedyRestClient";
import { useEffect } from "react";

export default function Page() {
  const getOffices = async () => {
    EcontRestClient.request(
      "Nomenclatures/NomenclaturesService.getOffices.json",
      { cityID: 41 }
    )
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  const getClientProfiles = async () => {
    EcontRestClient.request("Profile/ProfileService.getClientProfiles.json")
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  const getShipments = async () => {
    EcontRestClient.request("Shipments/ShipmentService.getMyAWB.json", {
      dateFrom: "2024-04-01",
      dateTo: "2024-04-25",
    })
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  const getSpeedyOffices = async () => {
    apiRequest("shipment")
      .then((data) => console.log(data, "speedy"))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getSpeedyOffices();
  }, []);

  return <h1>Spedition</h1>;
}
