import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { EncancedMode, StoreProduct, StoreUnits } from './types';
import { CreateProduct } from './createProduct';
import { EditProduct } from './editProduct';

const ProductActions = (
  submitHandler: () => void,
  setMode: Dispatch<SetStateAction<EncancedMode>>
) => (
  <div className="col-span-2 flex justify-end space-x-4">
    <button
      onClick={() => setMode(EncancedMode.None)}
      className="px-4 py-2 bg-theme-light-secondary dark:bg-theme-dark-secondary text-white rounded-md shadow-sm hover:bg-theme-light-tertiary dark:hover:bg-theme-dark-tertiary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-light-secondary dark:focus:ring-theme-dark-secondary"
    >
      Откажи
    </button>
    <button
      onClick={submitHandler}
      className="px-4 py-2 bg-theme-light-primary dark:bg-theme-dark-primary text-white rounded-md shadow-sm hover:bg-theme-light-secondary dark:hover:bg-theme-dark-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-light-primary dark:focus:ring-theme-dark-primary"
    >
      Запиши
    </button>
  </div>
);

interface ProductEditorProps {
  selected?: StoreProduct;
  mode: EncancedMode;
  setMode: Dispatch<SetStateAction<EncancedMode>>;
  onSubmit: (product: StoreProduct) => Promise<void>;
}

export const ProductEditor = ({
  mode = EncancedMode.None,
  selected,
  setMode,
  onSubmit
}: ProductEditorProps) => {
  const [product, setProduct] = useState<StoreProduct | undefined>();

  const handleChange = (key: keyof StoreProduct, value: string | number) => {
    const updatedValue =
      key === 'quantity' || key === 'code' ? Number(value) : value;
    setProduct(
      (prev) =>
        prev && {
          ...prev,
          [key]: updatedValue
        }
    );
  };

  const submitHandler = () => {
    if (product) {
      onSubmit(product);
    }
  };

  useEffect(() => {
    switch (mode) {
      case EncancedMode.Create:
        setProduct({
          category: '',
          code: '',
          name: '',
          package: 0,
          quantity: 0,
          unit: StoreUnits.kg,
          color: '',
          packagePrice: 0,
          percentage_increase: 0,
          price: 0,
          totalQuantity: 0
        });
        break;
      case EncancedMode.Edit:
        setProduct(selected);
        break;
      default:
        break;
    }
  }, [selected, mode]);

  return (
    <>
      {mode === EncancedMode.Create && (
        <CreateProduct
          product={product}
          handleChange={handleChange}
          submitHandler={submitHandler}
          setMode={setMode}
          ProductActions={ProductActions}
        />
      )}
      {mode === EncancedMode.Edit && (
        <EditProduct
          product={product}
          handleChange={handleChange}
          submitHandler={submitHandler}
          setMode={setMode}
          ProductActions={ProductActions}
        />
      )}
      {mode === EncancedMode.None && null}
    </>
  );
};
