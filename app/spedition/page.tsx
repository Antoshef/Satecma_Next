"use client";
import { EcontRestClient } from "@/utils/econtRestClient";
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

  useEffect(() => {
    getOffices();
  }, []);

  return <h1>Spedition</h1>;
}
