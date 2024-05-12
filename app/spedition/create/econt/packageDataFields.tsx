import {
  Checkbox,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useCreateEcontPackage } from "./useCreateEcontPackage";

export const PackageDataFields = () => {
  const { packageData, setPackageData } = useCreateEcontPackage();
  const {
    description,
    dimensions,
    id,
    isFragile,
    quantity,
    type,
    volume,
    weight,
    isLessThan60cm,
  } = packageData;

  return (
    <section className="flex flex-col gap-4">
      <Typography className="bg-gray-800 text-white px-2 py-1" variant="h6">
        Данни за пратката
      </Typography>
      <Grid container className="gap-4">
        <div className="flex-col flex gap-4">
          <Select
            id="type"
            label="Тип на пратката"
            required
            value={type}
            onChange={(e) =>
              setPackageData((state) => ({
                ...state,
                type: e.target.value,
              }))
            }
          >
            <MenuItem value="Писмо">Документ</MenuItem>
            <MenuItem value="Писмо">Колет</MenuItem>
            <MenuItem value="Писмо">Пощенска пратка</MenuItem>
            <MenuItem value="Писмо">Карго палет</MenuItem>
            <MenuItem value="Писмо">Карго експрес</MenuItem>
            <MenuItem value="Писмо">Карго палет + документи</MenuItem>
          </Select>
          <TextField
            id="quantity"
            type="number"
            label="Брой части"
            required
            value={quantity}
            onChange={(e) =>
              setPackageData((state) => ({
                ...state,
                quantity: +e.target.value,
              }))
            }
          />
          <TextField
            id="weight"
            label="Тегло на пратката (кг)"
            value={weight}
            type="number"
            required
            onChange={(e) =>
              setPackageData((state) => ({
                ...state,
                weight: +e.target.value,
              }))
            }
          />
        </div>
        <div className="flex flex-col gap-4">
          <TextField
            id="id"
            label="Номер на пратката"
            value={id}
            onChange={(e) =>
              setPackageData((state) => ({
                ...state,
                id: e.target.value,
              }))
            }
          />
          <TextField
            id="volume"
            label="Обем на пратката (м3)"
            value={volume}
            type="number"
            onChange={(e) =>
              setPackageData((state) => ({
                ...state,
                volume: +e.target.value,
              }))
            }
          />
          <TextField
            id="description"
            label="Описание на пратката"
            value={description}
            onChange={(e) =>
              setPackageData((state) => ({
                ...state,
                description: e.target.value,
              }))
            }
          />
        </div>

        <div className="flex flex-col gap-4">
          <TextField
            id="dimensions.width"
            label="Ширина (см)"
            value={dimensions.width}
            type="number"
            onChange={(e) =>
              setPackageData((state) => ({
                ...state,
                dimensions: {
                  ...dimensions,
                  width: +e.target.value,
                },
              }))
            }
          />
          <TextField
            id="dimensions.height"
            label="Височина (см)"
            type="number"
            value={dimensions.height}
            onChange={(e) =>
              setPackageData((state) => ({
                ...state,
                dimensions: {
                  ...dimensions,
                  height: +e.target.value,
                },
              }))
            }
          />
          <TextField
            id="dimensions.length"
            label="Дължина (см)"
            value={dimensions.length}
            onChange={(e) =>
              setPackageData((state) => ({
                ...state,
                dimensions: {
                  ...dimensions,
                  length: +e.target.value,
                },
              }))
            }
          />
        </div>
        <div className="flex flex-col gap-4">
          <Grid
            item
            className="cursor-pointer"
            onClick={() =>
              setPackageData((state) => ({
                ...state,
                isFragile: !isFragile,
              }))
            }
          >
            <Typography component="span" variant="body2">
              Пратката ми е чуплива
            </Typography>
            <Checkbox
              checked={isFragile}
              inputProps={{ "aria-label": "controlled" }}
            />
          </Grid>
          <Grid
            item
            className="cursor-pointer"
            onClick={() =>
              setPackageData((state) => ({
                ...state,
                isLessThan60cm: !isLessThan60cm,
              }))
            }
          >
            <Typography component="span" variant="body2">
              Под 60 см
            </Typography>
            <Checkbox
              checked={isLessThan60cm}
              inputProps={{ "aria-label": "controlled" }}
            />
          </Grid>
        </div>
      </Grid>
    </section>
  );
};
