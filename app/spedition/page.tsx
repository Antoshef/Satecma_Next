"use client";
import { MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { CreateEcontPackage } from "./create/econt";
import { CreateSpeedyPackage } from "./create/speedy";
import { getCities, getOffices } from "./create/econt/services/utils";
import { useAppDispatch } from "../../lib/hooks";
import {
  updateCities,
  updateOffices,
} from "../../lib/features/spedition/econt";

export default function Page() {
  const [spedition, setSpedition] = useState<string>("Econt");
  const dispatch = useAppDispatch();

  useEffect(() => {
    getOffices().then((offices) => dispatch(updateOffices(offices)));
    getCities().then((cities) => dispatch(updateCities(cities)));
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
