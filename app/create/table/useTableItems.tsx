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
  const [total, setTotal] = useState({
    amountWithoutDiscount: 0,
    discount: 0,
    netAmount: 0,
    vat: 0,
    paid: 0
  });
  const [lastCustomItemCode, setLastCustomItemCode] = useState(8000);

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

  const addItem = useCallback(() => {
    if (selectedProduct) {
      const { unit, code, name, sellPrice, packing } = selectedProduct;
      const vat = 20;
      const newItem: Item = {
        rowIndex: items.length,
        code: code || (items.length + 8000).toString(),
        name,
        packing,
        quantity: 1,
        unit,
        sellPrice,
        discount: 0,
        vat,
        totalPrice: 0
      };
      setItems((state) => [...state, newItem]);
      setSelectedProduct(null);
    } else {
      const newItem: Item = {
        rowIndex: items.length,
        code: lastCustomItemCode.toString(),
        name: '',
        packing: 0,
        quantity: 1,
        unit: '',
        sellPrice: 0,
        discount: 0,
        vat: 0,
        totalPrice: 0
      };
      setLastCustomItemCode((state) => state + 1);
      setItems((state) => [...state, newItem]);
    }
  }, [items, selectedProduct, lastCustomItemCode, setSelectedProduct]);

  const removeItem = (code: string | number | null) => {
    setItems((state) => state.filter((item) => item.code !== code));
  };

  useEffect(() => {
    setTotal(() => {
      const amountWithoutDiscount = items.reduce(
        (acc, item) => acc + Number(item.totalPrice),
        0
      );
      const discount = items.reduce(
        (acc, item) =>
          acc + (Number(item.discount) / 100) * Number(item.totalPrice),
        0
      );
      const netAmount = amountWithoutDiscount - discount;
      const vat = 0.2 * netAmount;
      const paid = netAmount + vat;

      return {
        amountWithoutDiscount,
        discount,
        netAmount,
        vat,
        paid
      };
    });
  }, [items]);

  return {
    items,
    total,
    itemChangeHandler,
    itemSelectHandler,
    addItem,
    removeItem
  };
};
