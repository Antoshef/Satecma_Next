import { StoreUnits } from "@/store/utils/types";
import { useCallback, useEffect, useState } from "react";
import { Item, Product } from "../invoice/types";
import { calculateItemPrice } from "../invoice/utils";

interface TableItemsProps {
  selectedProduct: Product | null;
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product | null>>;
}

export const useTableItems = ({
  selectedProduct,
  setSelectedProduct,
}: TableItemsProps) => {
  const [items, setItems] = useState<Item[]>([]);
  const [services, setServices] = useState<Item[]>([]);
  const [total, setTotal] = useState({
    amountWithoutDiscount: 0,
    discount: 0,
    netAmount: 0,
    VAT: 0,
    paid: 0,
  });

  const itemChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, dataset } = e.target;
    const newItems = [...items];
    const currentItem = newItems.find((item) => item.code === dataset.code);
    if (currentItem) {
      (currentItem as any)[name] = value;
      currentItem.totalPrice = calculateItemPrice(currentItem);
      setItems(newItems);
    }
  };

  const itemSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, dataset, name } = e.target;
    const newItems = [...items];
    const currentItem = newItems.find((item) => item.code === dataset.code);
    if (currentItem) {
      (currentItem as any)[name] = value;
      currentItem.totalPrice = calculateItemPrice(currentItem);
      setItems(newItems);
    }
  };

  const serviceChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, dataset } = e.target;
    const newServices = [...services];
    const currentService = newServices.find(
      (item) => item.code === dataset.code,
    );
    if (currentService) {
      (currentService as any)[name] = value;
      currentService.totalPrice = (
        currentService.quantity * currentService.price
      ).toFixed(2);
      setServices(newServices);
    }
  };

  const serviceSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, dataset } = e.target;
    const newServices = [...services];
    const currentService = newServices.find(
      (item) => item.code === dataset.code,
    );
    if (currentService) {
      currentService.VAT = value;
      setServices(newServices);
    }
  };

  const addItem = useCallback(() => {
    if (selectedProduct) {
      const { unit, code, name, price, packing, percentage_increase } =
        selectedProduct;
      const salePrice = price * percentage_increase;
      const VAT = "20";
      const newItem: Item = {
        code: code || (items.length + services.length + 8000).toString(),
        name,
        packing,
        currentPackage: Number(packing.split(", ")[0]),
        quantity: 1,
        unit,
        price: salePrice,
        discount: 0,
        VAT,
        totalPrice: "0",
      };
      newItem.totalPrice = calculateItemPrice(newItem);
      setItems((state) => [...state, newItem]);
      setSelectedProduct(null);
    } else {
      addService();
    }
  }, [items, selectedProduct, services, setSelectedProduct]);

  const removeItem = (code: string | number | null) => {
    setItems((state) => state.filter((item) => item.code !== code));
    setServices((state) => state.filter((item) => item.code !== code));
  };

  const addService = () => {
    setServices((state) => [
      ...state,
      {
        code: (items.length + services.length + 9000).toString(),
        name: "",
        packing: "",
        currentPackage: 0,
        unit: StoreUnits.pcs,
        quantity: 1,
        price: 0,
        unit_price: 0,
        discount: 0,
        totalPrice: "0",
        VAT: "0",
      },
    ]);
  };

  useEffect(() => {
    setTotal(() => {
      let amountWithoutDiscount = items.reduce(
        (acc, item) => acc + Number(item.totalPrice),
        0,
      );
      amountWithoutDiscount += services.reduce(
        (acc, item) => acc + Number(item.totalPrice),
        0,
      );
      let discount = items.reduce(
        (acc, item) =>
          acc + (Number(item.discount) / 100) * Number(item.totalPrice),
        0,
      );
      discount += services.reduce(
        (acc, item) =>
          acc + (Number(item.discount) / 100) * Number(item.totalPrice),
        0,
      );
      const netAmount = amountWithoutDiscount - discount;
      const VAT = 0.2 * netAmount;
      const paid = netAmount + VAT;

      return {
        amountWithoutDiscount,
        discount,
        netAmount,
        VAT,
        paid,
      };
    });
  }, [items, services]);

  return {
    items,
    services,
    total,
    itemChangeHandler,
    itemSelectHandler,
    serviceChangeHandler,
    serviceSelectHandler,
    addItem,
    removeItem,
  };
};
