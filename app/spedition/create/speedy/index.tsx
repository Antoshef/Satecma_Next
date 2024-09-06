import { Grid, Typography } from "@mui/material";
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
    <Grid container>
      <Typography variant="h6">Speedy</Typography>
      <Grid container>
        <ul>
          {query.data?.results.map((person: any) => (
            <li key={person.name}>{person.name}</li>
          ))}
        </ul>
      </Grid>
    </Grid>
  );
};

import React from "react";
