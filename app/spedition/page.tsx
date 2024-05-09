"use client";
import { EcontRestClient } from "@/utils/econtRestClient";
import { apiRequest } from "@/utils/speedyRestClient";
import { useEffect, useState } from "react";

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
    getShipments();
    // getSpeedyOffices();
    // getPaymentReportService();
    getShipmentStatuses();
  }, []);

  return (
    <article>
      <h1>Spedition</h1>
      {econtShipments.map((shipment) => (
        <div key={shipment.shipmentNumber}>
          <p>{shipment.shipmentNumber}</p>
          <p>{shipment.senderName}</p>
          <p>{shipment.status}</p>
          <p>{shipment.createdDate}</p>
          <p>{shipment.acceptedDate}</p>
          <p>{shipment.cdAmount}</p>
          <p>{shipment.courierServiceAmount}</p>
          <p>{shipment.courierServiceMasterPayer}</p>
          <p>{shipment.receiverPhone}</p>
          <p>{shipment.cdCurrency}</p>
          <p>{shipment.courierServiceCurrency}</p>
        </div>
      ))}
    </article>
  );
}
