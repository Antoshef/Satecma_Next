import { useEffect, useState } from "react";
import { StoreProductData } from "./types";
import { Button, Grid, Input, Typography } from "@mui/material";

interface ProductEditorProps {
  selected?: StoreProductData;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  onSubmit: (product: StoreProductData) => Promise<void>;
}

export const ProductEditor = ({
  editMode,
  selected,
  setEditMode,
  onSubmit,
}: ProductEditorProps) => {
  const [product, setProduct] = useState<StoreProductData | undefined>(
    selected
  );

  const handleChange = (
    key: keyof StoreProductData,
    value: string | number
  ) => {
    const updatedValue =
      key === "quantity" || key === "code" ? Number(value) : value;
    setProduct(
      (prev) =>
        prev && {
          ...prev,
          [key]: updatedValue,
        }
    );
  };

  const submitHandler = () => {
    if (product) {
      onSubmit(product);
    }
  };

  useEffect(() => {
    setProduct(selected);
  }, [selected]);

  return editMode ? (
    <Grid container columnSpacing={3} margin={2} alignItems="center">
      <Grid item>
        <Typography variant="subtitle1">Код</Typography>
        {/* <Typography variant="subtitle1">{product?.code}</Typography> */}
        <Input
          name="code"
          placeholder="Код"
          type="number"
          value={product?.code}
          onChange={(e) =>
            handleChange(
              e.target.name as keyof StoreProductData,
              e.target.value
            )
          }
        />
      </Grid>
      <Grid item>
        <Typography variant="subtitle1">Име</Typography>
        <Input
          name="name"
          placeholder="Име"
          type="text"
          value={product?.name}
          onChange={(e) =>
            handleChange(
              e.target.name as keyof StoreProductData,
              e.target.value
            )
          }
        />
      </Grid>
      <Grid item>
        <Typography variant="subtitle1">Опаковка</Typography>
        <Typography variant="subtitle1">{product?.package}</Typography>
      </Grid>
      <Grid item>
        <Typography variant="subtitle1">Количество</Typography>
        <Input
          name="quantity"
          placeholder="Количество"
          type="number"
          value={product?.quantity}
          onChange={(e) =>
            handleChange(
              e.target.name as keyof StoreProductData,
              e.target.value
            )
          }
        />
      </Grid>
      <Grid item>
        <Typography variant="subtitle1">Категория</Typography>
        <Input
          name="category"
          placeholder="Категория"
          type="text"
          value={product?.category}
          onChange={(e) =>
            handleChange(
              e.target.name as keyof StoreProductData,
              e.target.value
            )
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
