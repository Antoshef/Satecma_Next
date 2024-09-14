"use client";
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
      <div className="relative w-44 mb-4">
        <select
          id="spedition"
          value={spedition}
          onChange={(e) => setSpedition(e.target.value)}
          className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="Econt">Econt</option>
          <option value="Speedy">Speedy</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M7 10l5 5 5-5H7z" />
          </svg>
        </div>
      </div>
      {spedition === "Econt" && <CreateEcontPackage />}
      {spedition === "Speedy" && <CreateSpeedyPackage />}
    </section>
  );
}
