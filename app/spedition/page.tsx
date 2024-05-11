"use client";
import { EcontRestClient } from "@/utils/econtRestClient";
import { apiRequest } from "@/utils/speedyRestClient";
import { Grid, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { CreateEcontPackage } from "./create/econt";
import { CreateSpeedyPackage } from "./create/speedy";

interface EcontShipment {
  shipmentNumber: string;
  senderName: string;
  status: string;
  createdDate: number;
  acceptedDate: number;
  cdAmount: number;
  courierServiceAmount: number;
  courierServiceMasterPayer: string;
  receiverPhone: string;
  cdCurrency: string;
  courierServiceCurrency: string;
}

export default function Page() {
  const [spedition, setSpedition] = useState<string>("Econt");
  const [econtShipments, setEcontShipments] = useState<EcontShipment[]>([]);

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
    EcontRestClient.request("Shipments/ShipmentService.getMyAWB.json")
      .then((data) => setEcontShipments(data.results as EcontShipment[]))
      .catch((error) => console.error(error));
  };

  const getSpeedyOffices = async () => {
    apiRequest("shipment")
      .then((data) => console.log(data, "DATA"))
      .catch((error) => console.error(error));
  };

  const getPaymentReportService = async () => {
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

  const getShipmentStatuses = async () => {
    EcontRestClient.request(
      "Shipments/ShipmentService.getShipmentStatuses.json",
      {}
    )
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    // getOffices();
    // getClientProfiles();
    // getShipments();
    // getSpeedyOffices();
    // getPaymentReportService();
    // getShipmentStatuses();
  }, []);

  return (
    <main className="flex flex-col justify-center align-middle m-auto max-w-screen-lg">
      <Select
        id="spedition"
        value={spedition}
        className="w-44 mb-4"
        onChange={(e) => setSpedition(e.target.value)}
      >
        <MenuItem value="Econt">Econt</MenuItem>
        <MenuItem value="Speedy">Speedy</MenuItem>
      </Select>
      {spedition === "Econt" && <CreateEcontPackage />}
      {spedition === "Speedy" && <CreateSpeedyPackage />}
    </main>
  );
}
