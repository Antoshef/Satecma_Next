import { Checkbox, Grid, TextField, Typography } from "@mui/material";
import { useCreateEcontPackage } from "./useCreateEcontPackage";

export const AdditionalServices = () => {
  const { additionalServices, setAdditionalServices } = useCreateEcontPackage();
  const { SMSNotification, cashOnDelivery, invoiceId, paymentType, price } =
    additionalServices;

  return (
    <article className="flex flex-col gap-4">
      <Typography className="bg-gray-800 text-white px-2 py-1" variant="h6">
        Допълнителни услуги
      </Typography>
      <section className="flex flex-row gap-4">
        <div className="flex flex-col gap-4">
          <TextField
            id="price"
            label="Обявена стойност"
            type="number"
            value={price}
            onChange={(e) =>
              setAdditionalServices((state) => ({
                ...state,
                price: Number(e.target.value),
              }))
            }
          />
          <TextField
            id="cashOnDeliveryPayer"
            label="Наложен платеж"
            value={cashOnDelivery.payer}
            onChange={(e) =>
              setAdditionalServices((state) => ({
                ...state,
                cashOnDelivery: {
                  ...state.cashOnDelivery,
                  payer: e.target.value,
                },
              }))
            }
          />
          <TextField
            id="cashOnDeliveryAmount"
            label="Сума"
            value={cashOnDelivery.amount}
            onChange={(e) =>
              setAdditionalServices((state) => ({
                ...state,
                cashOnDelivery: {
                  ...state.cashOnDelivery,
                  amount: Number(e.target.value),
                },
              }))
            }
          />
        </div>
        <div className="flex flex-col gap-4">
          <TextField
            id="invoiceId"
            label="Фактура / Дата"
            value={invoiceId}
            onChange={(e) =>
              setAdditionalServices((state) => ({
                ...state,
                invoiceId: e.target.value,
              }))
            }
          />
          <TextField
            id="paymentType"
            label="Тип на плащане"
            value={paymentType}
            onChange={(e) =>
              setAdditionalServices((state) => ({
                ...state,
                paymentType: e.target.value,
              }))
            }
          />
          <Grid
            item
            className="cursor-pointer"
            onClick={() =>
              setAdditionalServices((state) => ({
                ...state,
                SMSNotification: !SMSNotification,
              }))
            }
          >
            <Typography component="span" variant="body2">
              SMS известяване
            </Typography>
            <Checkbox
              checked={SMSNotification}
              inputProps={{ "aria-label": "controlled" }}
            />
          </Grid>
        </div>
      </section>
    </article>
  );
};
