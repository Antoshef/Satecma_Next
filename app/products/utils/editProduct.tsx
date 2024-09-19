import { Dispatch, SetStateAction } from 'react';
import { EncancedMode, StoreProduct } from './types';

interface EditProductProps {
  product: StoreProduct | undefined;
  handleChange: (key: keyof StoreProduct, value: string | number) => void;
  submitHandler: () => void;
  setMode: Dispatch<SetStateAction<EncancedMode>>;
  ProductActions: (
    submitHandler: () => void,
    setMode: Dispatch<SetStateAction<EncancedMode>>
  ) => JSX.Element;
}

export const EditProduct = ({
  product,
  handleChange,
  submitHandler,
  setMode,
  ProductActions
}: EditProductProps) => {
  return (
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
      {ProductActions(submitHandler, setMode)}
    </div>
  );
};
