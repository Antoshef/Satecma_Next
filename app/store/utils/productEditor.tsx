import { useEffect, useState } from 'react';
import { StoreProduct } from './types';

interface ProductEditorProps {
  selected?: StoreProduct;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  onSubmit: (product: StoreProduct) => Promise<void>;
}

export const ProductEditor = ({
  editMode,
  selected,
  setEditMode,
  onSubmit
}: ProductEditorProps) => {
  const [product, setProduct] = useState<StoreProduct | undefined>(selected);

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
    setProduct(selected);
  }, [selected]);

  return editMode ? (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-theme-light-background dark:bg-theme-dark-background">
      <div>
        <label className="block text-sm font-medium text-theme-light-tertiary dark:text-theme-dark-tertiary">
          Код
        </label>
        <p className="mt-1 block w-full p-2 border border-theme-light-secondary dark:border-theme-dark-secondary rounded-md shadow-sm sm:text-sm">
          {product?.code}
        </p>
      </div>
      <div>
        <label className="block text-sm font-medium text-theme-light-tertiary dark:text-theme-dark-tertiary">
          Име
        </label>
        <input
          name="name"
          placeholder="Име"
          type="text"
          value={product?.name}
          onChange={(e) =>
            handleChange(e.target.name as keyof StoreProduct, e.target.value)
          }
          className="mt-1 block w-full p-2 border border-theme-light-secondary dark:border-theme-dark-secondary rounded-md shadow-sm focus:ring-theme-light-primary focus:border-theme-light-primary dark:focus:ring-theme-dark-primary dark:focus:border-theme-dark-primary sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-theme-light-tertiary dark:text-theme-dark-tertiary">
          Опаковка
        </label>
        <p className="mt-1 block w-full p-2 border border-theme-light-secondary dark:border-theme-dark-secondary rounded-md shadow-sm sm:text-sm">
          {product?.package}
        </p>
      </div>
      <div>
        <label className="block text-sm font-medium text-theme-light-tertiary dark:text-theme-dark-tertiary">
          Количество
        </label>
        <input
          name="quantity"
          placeholder="Количество"
          type="number"
          value={product?.quantity}
          onChange={(e) =>
            handleChange(e.target.name as keyof StoreProduct, e.target.value)
          }
          className="mt-1 block w-full p-2 border border-theme-light-secondary dark:border-theme-dark-secondary rounded-md shadow-sm focus:ring-theme-light-primary focus:border-theme-light-primary dark:focus:ring-theme-dark-primary dark:focus:border-theme-dark-primary sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-theme-light-tertiary dark:text-theme-dark-tertiary">
          Категория
        </label>
        <input
          name="category"
          placeholder="Категория"
          type="text"
          value={product?.category}
          onChange={(e) =>
            handleChange(e.target.name as keyof StoreProduct, e.target.value)
          }
          className="mt-1 block w-full p-2 border border-theme-light-secondary dark:border-theme-dark-secondary rounded-md shadow-sm focus:ring-theme-light-primary focus:border-theme-light-primary dark:focus:ring-theme-dark-primary dark:focus:border-theme-dark-primary sm:text-sm"
        />
      </div>
      <div className="col-span-2 flex justify-end space-x-4">
        <button
          onClick={submitHandler}
          className="px-4 py-2 bg-theme-light-primary dark:bg-theme-dark-primary text-white rounded-md shadow-sm hover:bg-theme-light-secondary dark:hover:bg-theme-dark-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-light-primary dark:focus:ring-theme-dark-primary"
        >
          Save
        </button>
        <button
          onClick={() => setEditMode(false)}
          className="px-4 py-2 bg-theme-light-secondary dark:bg-theme-dark-secondary text-white rounded-md shadow-sm hover:bg-theme-light-tertiary dark:hover:bg-theme-dark-tertiary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-light-secondary dark:focus:ring-theme-dark-secondary"
        >
          Cancel
        </button>
      </div>
    </div>
  ) : null;
};
