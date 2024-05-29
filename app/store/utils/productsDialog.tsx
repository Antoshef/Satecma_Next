import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import { Hourglass } from "react-loader-spinner";
import { InvoiceProductData, StoreProduct, StoreUnits } from "./types";

interface Props {
  isOpen: boolean;
  isFetching: boolean;
  productsToUpdate: InvoiceProductData[] | null;
  productMap: Map<string, StoreProduct | null>;
  setIsOpen: (open: boolean) => void;
  onConfirm: () => void;
}

export const ProductsDialog = ({
  isOpen,
  setIsOpen,
  isFetching,
  productsToUpdate,
  productMap,
  onConfirm,
}: Props) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      fullWidth
      maxWidth="md"
    >
      {isFetching ? (
        <DialogTitle marginRight={4}>Обновяване на склада...</DialogTitle>
      ) : (
        <>
          <DialogTitle marginRight={4}>Проверка на продуктите</DialogTitle>
          <IconButton
            aria-label="close"
            onClick={() => setIsOpen(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </>
      )}
      <DialogContent>
        {isFetching ? (
          <Grid className="justify-center" container>
            <Hourglass
              visible={true}
              height="80"
              width="80"
              ariaLabel="hourglass-loading"
              colors={["#306cce", "#72a1ed"]}
            />
          </Grid>
        ) : (
          <Grid container direction="column" alignItems="center">
            <DialogContentText className="p-4" variant="h5">
              Брой продукти за добавяне: {productsToUpdate?.length}
            </DialogContentText>
            {productsToUpdate
              ?.sort((a, b) => {
                const aKey = `${a.code}-${a.package}`;
                const storeProduct = productMap.get(aKey);
                if (storeProduct) {
                  return -1;
                } else {
                  return 1;
                }
              })
              .map((incomingProduct) => {
                const key = `${incomingProduct.code}-${incomingProduct.package}`;
                const storeProduct = productMap.get(key);
                return (
                  <Fragment key={incomingProduct.code}>
                    <Grid className="mb-4" container>
                      <DialogContentText variant="body1">
                        {storeProduct ? (
                          <>
                            <Divider />
                            Код: {storeProduct.code}, Име: {storeProduct.name},
                            Опаковка: {storeProduct.package} {storeProduct.unit}{" "}
                            - Текущо количество:{" "}
                            <Typography
                              fontSize="1.25rem"
                              component="span"
                              className="text-red-500"
                            >
                              {storeProduct.quantity}
                            </Typography>
                            , Приходящо количество:{" "}
                            <Typography
                              fontSize="1.25rem"
                              component="span"
                              className="text-blue-500"
                            >
                              {incomingProduct.unit === StoreUnits.pcs
                                ? incomingProduct.totalQuantity
                                : incomingProduct.quantity}{" "}
                            </Typography>{" "}
                            {"=>"} ,Общо:{" "}
                            <Typography
                              fontSize="1.25rem"
                              component="span"
                              className="text-green-500"
                            >
                              {storeProduct.quantity + incomingProduct.quantity}{" "}
                              {StoreUnits.pcs}
                            </Typography>
                          </>
                        ) : (
                          <>
                            <Divider />
                            Код: {incomingProduct.code}, Име:{" "}
                            {incomingProduct.description}, Опаковка:{" "}
                            {incomingProduct.package} {incomingProduct.unit},
                            Приходящо количество:{" "}
                            <Typography
                              fontSize="1.25rem"
                              component="span"
                              className="text-blue-500"
                            >
                              {incomingProduct.unit === StoreUnits.pcs
                                ? incomingProduct.totalQuantity
                                : incomingProduct.quantity}{" "}
                              {StoreUnits.pcs}
                            </Typography>
                          </>
                        )}
                      </DialogContentText>
                    </Grid>
                  </Fragment>
                );
              })}
            <Button variant="contained" color="primary" onClick={onConfirm}>
              Прибави продуктите
            </Button>
          </Grid>
        )}
      </DialogContent>
    </Dialog>
  );
};
