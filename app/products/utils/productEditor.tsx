import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { EncancedMode, Product } from './types';
import { ProductForm } from './productForm';

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
  selected?: Product;
  mode: EncancedMode;
  categories: string[];
  setMode: Dispatch<SetStateAction<EncancedMode>>;
  onSubmit: (product: Product) => Promise<void>;
}

export const ProductEditor = ({
  mode = EncancedMode.None,
  selected,
  categories,
  setMode,
  onSubmit
}: ProductEditorProps) => {
  const [product, setProduct] = useState<Product | undefined>();

  const handleChange = (key: keyof Product, value: string | number) => {
    setProduct(
      (prev) =>
        prev && {
          ...prev,
          [key]: value
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
          code: '',
          name: '',
          category: '',
          package: 1,
          unit: '',
          color: '',
          buyPrice: 0,
          sellPrice: 1,
          percentageIncrease: 100,
          quantity: 0,
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
      {(mode === EncancedMode.Create || mode === EncancedMode.Edit) && (
        <ProductForm
          product={product}
          categories={categories}
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
