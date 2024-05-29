import { useEffect, useState } from "react";
import { Client } from "./types";
import { Button, Grid, Input, Typography } from "@mui/material";

interface Props {
  selected?: Client;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  onSubmit: (client: Client) => Promise<void>;
}

export const ClientEditor = ({
  editMode,
  selected,
  setEditMode,
  onSubmit,
}: Props) => {
  const [client, setProduct] = useState<Client | undefined>(selected);

  const handleChange = (key: keyof Client, value: string) => {
    setProduct(
      (prev) =>
        prev && {
          ...prev,
          [key]: value,
        },
    );
  };

  const submitHandler = () => {
    if (client) {
      onSubmit(client);
    }
  };

  useEffect(() => {
    setProduct(selected);
  }, [selected]);

  return editMode ? (
    <Grid container columnSpacing={3} margin={2} alignItems="center">
      <Grid item>
        <Typography variant="subtitle1">Име</Typography>
        <Input
          name="name"
          placeholder="Име"
          type="text"
          value={client?.name}
          onChange={(e) =>
            handleChange(e.target.name as keyof Client, e.target.value)
          }
        />
      </Grid>
      <Grid item>
        <Typography variant="subtitle1">Град</Typography>
        <Input
          name="city"
          placeholder="Град"
          type="text"
          value={client?.city}
          onChange={(e) =>
            handleChange(e.target.name as keyof Client, e.target.value)
          }
        />
      </Grid>
      <Grid item>
        <Typography variant="subtitle1">Адрес</Typography>
        <Input
          name="address"
          placeholder="Адрес"
          type="text"
          value={client?.address}
          onChange={(e) =>
            handleChange(e.target.name as keyof Client, e.target.value)
          }
        />
      </Grid>
      <Grid item>
        <Typography variant="subtitle1">ЕИК</Typography>
        <Typography variant="subtitle1">{client?.eik}</Typography>
      </Grid>
      <Grid item>
        <Typography variant="subtitle1">ДДС №</Typography>
        <Input
          name="vat"
          placeholder="ДДС №"
          type="text"
          value={client?.vat}
          onChange={(e) =>
            handleChange(e.target.name as keyof Client, e.target.value)
          }
        />
      </Grid>
      <Grid item>
        <Typography variant="subtitle1">Директор</Typography>
        <Input
          name="director"
          placeholder="Директор"
          type="text"
          value={client?.director}
          onChange={(e) =>
            handleChange(e.target.name as keyof Client, e.target.value)
          }
        />
      </Grid>
      <Grid item>
        <Typography variant="subtitle1">Е-Поща</Typography>
        <Input
          name="email"
          placeholder="Е-Поща"
          type="text"
          value={client?.email}
          onChange={(e) =>
            handleChange(e.target.name as keyof Client, e.target.value)
          }
        />
      </Grid>
      <Grid item>
        <Typography variant="subtitle1">Телефон</Typography>
        <Input
          name="phone"
          placeholder="Телефон"
          type="text"
          value={client?.phone}
          onChange={(e) =>
            handleChange(e.target.name as keyof Client, e.target.value)
          }
        />
      </Grid>
      <Grid item>
        <Button onClick={submitHandler}>Save</Button>
        <Button onClick={() => setEditMode(false)}>Cancel</Button>
      </Grid>
    </Grid>
  ) : null;
};
