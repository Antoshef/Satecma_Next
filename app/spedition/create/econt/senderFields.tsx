import { Input, itemHandler } from "@/components/input";
import { TextField, Typography } from "@mui/material";
import { Sender } from "./types";
import { City } from "./services/shipments/types";

interface Props extends Sender {
  cities: City[];
  setSender: React.Dispatch<React.SetStateAction<Sender>>;
}

export const SenderFields = ({
  name,
  city,
  office,
  cities,
  currentCityOffices,
  setSender,
}: Props) => {
  return (
    <article className="flex flex-col gap-4">
      <Typography className="bg-gray-800 text-white px-2 py-1" variant="h6">
        Подател
      </Typography>
      <section className="flex flex-row gap-4">
        <TextField
          id="senderName"
          label="Упълномощено лице"
          type="text"
          required
          value={name}
        />
        <Input
          label="Град"
          required
          data={cities}
          selectedItem={city}
          setSelectedItem={(name) =>
            itemHandler(name, cities, "city", setSender)
          }
        />
        <Input
          label="Офис"
          required
          data={currentCityOffices}
          selectedItem={office}
          setSelectedItem={(name) =>
            itemHandler(name, currentCityOffices, "office", setSender)
          }
        />
      </section>
    </article>
  );
};
