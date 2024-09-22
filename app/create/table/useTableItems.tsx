import { useCallback, useEffect, useState } from 'react';
import { Item } from '../invoice/types';
import { Product } from '@/products/utils/types';

interface TableItemsProps {
  selectedProduct: Product | null;
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product | null>>;
}

export const useTableItems = ({
  selectedProduct,
  setSelectedProduct
}: TableItemsProps) => {
  const [items, setItems] = useState<Item[]>([]);
  const [services, setServices] = useState<Item[]>([]);
  const [total, setTotal] = useState({
    amountWithoutDiscount: 0,
    discount: 0,
    netAmount: 0,
    VAT: 0,
    paid: 0
  });

  const itemChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, dataset } = e.target;
    const newItems = [...items];
    const currentItem = newItems.find((item) => item.code === dataset.code);
    if (currentItem) {
      (currentItem as any)[name] = value;
      setItems(newItems);
    }
  };

  const itemSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, dataset, name } = e.target;
    const newItems = [...items];
    const currentItem = newItems.find((item) => item.code === dataset.code);
    if (currentItem) {
      (currentItem as any)[name] = value;
      setItems(newItems);
    }
  };

  const serviceChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, dataset } = e.target;
    const newServices = [...services];
    const currentService = newServices.find(
      (item) => item.code === dataset.code
    );
    if (currentService) {
      (currentService as any)[name] = value;
      setServices(newServices);
    }
  };

  const serviceSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, dataset } = e.target;
    const newServices = [...services];
    const currentService = newServices.find(
      (item) => item.code === dataset.code
    );
    if (currentService) {
      setServices(newServices);
    }
  };

  const addItem = useCallback(() => {
    if (selectedProduct) {
      const { unit, code, name, sellPrice, packing } = selectedProduct;
      const VAT = 20;
      const newItem: Item = {
        code: code || (items.length + services.length + 8000).toString(),
        name,
        packing,
        quantity: 1,
        unit,
        sellPrice,
        discount: 0,
        VAT,
        totalPrice: 0
      };
      setItems((state) => [...state, newItem]);
      setSelectedProduct(null);
    }
  }, [items, selectedProduct, services, setSelectedProduct]);

  const removeItem = (code: string | number | null) => {
    setItems((state) => state.filter((item) => item.code !== code));
    setServices((state) => state.filter((item) => item.code !== code));
  };

  useEffect(() => {
    setTotal(() => {
      let amountWithoutDiscount = items.reduce(
        (acc, item) => acc + Number(item.totalPrice),
        0
      );
      amountWithoutDiscount += services.reduce(
        (acc, item) => acc + Number(item.totalPrice),
        0
      );
      let discount = items.reduce(
        (acc, item) =>
          acc + (Number(item.discount) / 100) * Number(item.totalPrice),
        0
      );
      discount += services.reduce(
        (acc, item) =>
          acc + (Number(item.discount) / 100) * Number(item.totalPrice),
        0
      );
      const netAmount = amountWithoutDiscount - discount;
      const VAT = 0.2 * netAmount;
      const paid = netAmount + VAT;

      return {
        amountWithoutDiscount,
        discount,
        netAmount,
        VAT,
        paid
      };
    });
  }, [items, services]);

  return {
    items,
    total,
    itemChangeHandler,
    itemSelectHandler,
    addItem,
    removeItem
  };
};
