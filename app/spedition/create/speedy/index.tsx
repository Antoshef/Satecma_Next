import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useId } from "react";

const getStarWars = () =>
  fetch("https://swapi.dev/api/people").then((res) => res.json());

export const CreateSpeedyPackage = () => {
  const queryClient = useQueryClient();
  const id = useId();

  const query = useQuery({ queryKey: ["people"], queryFn: getStarWars });

  console.log(query, "QUERY");

  return (
    <div className="container mx-auto p-4">
      <h6 className="text-xl font-semibold">Speedy</h6>
      <div className="mt-4">
        <ul className="list-disc list-inside">
          {query.data?.results.map((person: any) => (
            <li key={person.name}>{person.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

import React from "react";
