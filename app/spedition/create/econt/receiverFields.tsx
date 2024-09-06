import { Input, itemHandler } from "@/components/input";
import { Checkbox, Grid, TextField, Typography } from "@mui/material";
import { City } from "./services/shipments/types";
import { Receiver } from "./types";
import { CSSTransition } from "react-transition-group";
import { useRef } from "react";

interface Props extends Receiver {
  cities: City[];
  isAddressUsed: boolean;
  setIsAddressUsed: React.Dispatch<React.SetStateAction<boolean>>;
  setReceiver: React.Dispatch<React.SetStateAction<Receiver>>;
}

export const ReceiverFields = ({
  name,
  country,
  email,
  phone,
  cities,
  city,
  office,
  address,
  isAddressUsed,
  currentCityOffices,
  setIsAddressUsed,
  setReceiver,
}: Props) => {
  const addressRef = useRef<HTMLDivElement>(null);
  const officeRef = useRef<HTMLDivElement>(null);

  return (
    <article className="flex flex-col gap-4">
      <Typography className="bg-gray-800 text-white px-2 py-1" variant="h6">
        Получател
      </Typography>
      <section className="flex flex-col gap-4">
        <Grid
          item
          className="cursor-pointer"
          onClick={() => setIsAddressUsed(!isAddressUsed)}
        >
          <Typography component="span" variant="body2">
            Достави до адрес
          </Typography>
          <Checkbox
            checked={isAddressUsed}
            inputProps={{ "aria-label": "controlled" }}
          />
        </Grid>
        <div className="flex flex-row gap-4">
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
        </div>

        <div className="flex flex-row gap-4">
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
            data={cities}
            selectedItem={city}
            setSelectedItem={(name) =>
              itemHandler(name, cities, "city", setReceiver)
            }
          />
          <TextField
            id="postCode"
            label="Пощенски код"
            type="number"
            value={city?.postCode || ""}
            onChange={(e) =>
              setReceiver((state) => ({
                ...state,
                postCode: +e.target.value,
              }))
            }
          />
          <CSSTransition
            in={!isAddressUsed}
            timeout={300}
            classNames="address"
            unmountOnExit
            nodeRef={officeRef}
          >
            <Input
              label="Офис"
              required
              data={currentCityOffices}
              ref={officeRef}
              selectedItem={office}
              setSelectedItem={(name) =>
                itemHandler(name, currentCityOffices, "office", setReceiver)
              }
            />
          </CSSTransition>
        </div>

        <CSSTransition
          in={isAddressUsed}
          timeout={300}
          classNames="address"
          unmountOnExit
          nodeRef={addressRef}
        >
          <div className="flex flex-col gap-4" ref={addressRef}>
            <div className="flex flex-row gap-4">
              <TextField
                id="street"
                label="Улица"
                required
                value={address?.street || ""}
                onChange={(e) =>
                  setReceiver((state) => ({
                    ...state,
                    address: {
                      ...state.address,
                      street: e.target.value,
                    },
                  }))
                }
              />
              <TextField
                id="number"
                label="Номер"
                required
                value={address?.num || ""}
                onChange={(e) =>
                  setReceiver((state) => ({
                    ...state,
                    address: {
                      ...state.address,
                      num: e.target.value,
                    },
                  }))
                }
              />
              <TextField
                id="district"
                label="Квартал"
                value={address?.quarter || ""}
                onChange={(e) =>
                  setReceiver((state) => ({
                    ...state,
                    address: {
                      ...state.address,
                      quarter: e.target.value,
                    },
                  }))
                }
              />
            </div>
            <div className="flex flex-row gap-4">
              <TextField
                id="Building"
                label="Блок"
                value={address?.other || ""}
                onChange={(e) =>
                  setReceiver((state) => ({
                    ...state,
                    address: {
                      ...state.address,
                      other: e.target.value,
                    },
                  }))
                }
              />
              <TextField
                id="entrance"
                label="Вход"
                value={address?.other || ""}
                onChange={(e) =>
                  setReceiver((state) => ({
                    ...state,
                    address: {
                      ...state.address,
                      other: e.target.value,
                    },
                  }))
                }
              />
              <TextField
                id="floor"
                label="Етаж"
                value={address?.other || ""}
                onChange={(e) =>
                  setReceiver((state) => ({
                    ...state,
                    address: {
                      ...state.address,
                      other: e.target.value,
                    },
                  }))
                }
              />
              <TextField
                id="apartment"
                label="Апартамент"
                value={address?.other || ""}
                onChange={(e) =>
                  setReceiver((state) => ({
                    ...state,
                    address: {
                      ...state.address,
                      other: e.target.value,
                    },
                  }))
                }
              />
            </div>
          </div>
        </CSSTransition>
      </section>
    </article>
  );
};
