import { Input } from "@/components/input";
import { Grid, TextField, Typography } from "@mui/material";
import { useCreateEcontPackage } from "./useCreateEcontPackage";

export const ReceiverFields = () => {
  const {
    receiver: { name, phone, email, country, city, office },
    currentCityOffices: offices,
    cities,
    selectedCity,
    selectedOffice,
    setReceiver,
    setSelectedCity,
    setSelectedOffice,
  } = useCreateEcontPackage();

  const filteredOffices = offices?.filter(
    (office) => office.name && office.name.trim()
  );
  const filteredCities = cities?.filter(
    (city) => city.name && city.name.trim()
  );

  const cityHandler = (name: string) => {
    const selected = filteredCities.find((city) => city.name === name);
    setSelectedCity(selected || null);
  };

  const officeHandler = (name: string) => {
    const selected = filteredOffices.find((office) => office.name === name);
    setSelectedOffice(selected || null);
  };

  return (
    <article className="flex flex-col gap-4">
      <Typography className="bg-gray-800 text-white px-2 py-1" variant="h6">
        Получател
      </Typography>
      <Grid container className="gap-4">
        <div className="grid grid-cols-2 gap-4">
          <TextField
            id="phone"
            label="Телефон"
            required
            value={phone}
            onChange={(e) =>
              setReceiver((state) => ({
                ...state,
                phone: e.target.value,
              }))
            }
          />

          <TextField
            id="country"
            label="Държава"
            required
            disabled
            value={country}
            onChange={(e) =>
              setReceiver((state) => ({
                ...state,
                country: e.target.value,
              }))
            }
          />
          <Input
            label="Град"
            required
            data={filteredCities}
            selectedItem={selectedCity}
            setSelectedItem={cityHandler}
          />
          <Input
            label="Офис"
            required
            data={filteredOffices}
            selectedItem={selectedOffice}
            setSelectedItem={officeHandler}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <TextField
            id="name"
            label="Име на получател"
            required
            value={name}
            onChange={(e) =>
              setReceiver((state) => ({
                ...state,
                name: e.target.value,
              }))
            }
          />
          <TextField
            id="email"
            label="Имейл"
            value={email}
            onChange={(e) =>
              setReceiver((state) => ({
                ...state,
                email: e.target.value,
              }))
            }
          />
          <TextField
            id="postCode"
            label="Пощенски код"
            type="number"
            value={selectedCity?.postCode || ""}
            onChange={(e) =>
              setReceiver((state) => ({
                ...state,
                postCode: +e.target.value,
              }))
            }
          />
        </div>
      </Grid>
    </article>
  );
};
