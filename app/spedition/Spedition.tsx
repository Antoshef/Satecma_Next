"use client";
import { MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { CreateEcontPackage } from "./create/econt";
import { CreateSpeedyPackage } from "./create/speedy";
import { City, Office } from "./create/econt/services/shipments/types";

interface SpeditionProps {
  econt: {
    offices: Office[];
    cities: City[];
  };
}

export function Spedition({ econt }: SpeditionProps) {
  const [spedition, setSpedition] = useState<string>("Econt");
  console.log(econt, "Econt");

  return (
    <section className="flex flex-col justify-center align-middle m-auto max-w-screen-lg">
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
    </section>
  );
}
