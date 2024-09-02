"use client";
import { MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { CreateEcontPackage } from "./create/econt";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CreateSpeedyPackage } from "./create/speedy";

const queryClient = new QueryClient();

export default function Page() {
  const [spedition, setSpedition] = useState<string>("Speedy");

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}
