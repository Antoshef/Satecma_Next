import { Dispatch, SetStateAction } from 'react';
import { EncancedMode, StoreProduct, StoreUnits } from './types';

interface CreateProductProps {
  product: StoreProduct | undefined;
  handleChange: (key: keyof StoreProduct, value: string | number) => void;
  submitHandler: () => void;
  setMode: Dispatch<SetStateAction<EncancedMode>>;
  ProductActions: (
    submitHandler: () => void,
    setMode: Dispatch<SetStateAction<EncancedMode>>
  ) => JSX.Element;
}

export const CreateProduct = ({
  product,
  handleChange,
  submitHandler,
  setMode,
  ProductActions
}: CreateProductProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-theme-light-background dark:bg-theme-dark-background">
      <div>
        <label className="block text-sm font-medium text-theme-light-tertiary dark:text-theme-dark-tertiary">
          Код
        </label>
        <input
          name="code"
          placeholder="Код"
          type="number"
          value={product?.code}
          onChange={(e) =>
            handleChange(e.target.name as keyof StoreProduct, e.target.value)
          }
          className="mt-1 block w-full p-2 border border-theme-light-secondary dark:border-theme-dark-secondary rounded-md shadow-sm sm:text-sm"
        />
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
          className="mt-1 block w-full p-2 border border-theme-light-secondary dark:border-theme-dark-secondary rounded-md shadow-sm sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-theme-light-tertiary dark:text-theme-dark-tertiary">
          Опаковка
        </label>
        <input
          name="package"
          placeholder="Опаковка"
          type="number"
          value={product?.package}
          onChange={(e) =>
            handleChange(e.target.name as keyof StoreProduct, e.target.value)
          }
          className="mt-1 block w-full p-2 border border-theme-light-secondary dark:border-theme-dark-secondary rounded-md shadow-sm sm:text-sm"
        />
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
          className="mt-1 block w-full p-2 border border-theme-light-secondary dark:border-theme-dark-secondary rounded-md shadow-sm sm:text-sm"
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
          className="mt-1 block w-full p-2 border border-theme-light-secondary dark:border-theme-dark-secondary rounded-md shadow-sm sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-theme-light-tertiary dark:text-theme-dark-tertiary">
          Цвят
        </label>
        <input
          name="color"
          placeholder="Цвят"
          type="text"
          value={product?.color}
          onChange={(e) =>
            handleChange(e.target.name as keyof StoreProduct, e.target.value)
          }
          className="mt-1 block w-full p-2 border border-theme-light-secondary dark:border-theme-dark-secondary rounded-md shadow-sm sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-theme-light-tertiary dark:text-theme-dark-tertiary">
          Единица
        </label>
        <select
          name="unit"
          value={product?.unit}
          onChange={(e) =>
            handleChange(e.target.name as keyof StoreProduct, e.target.value)
          }
          className="mt-1 block w-full p-2 border border-theme-light-secondary dark:border-theme-dark-secondary rounded-md shadow-sm sm:text-sm"
        >
          {Object.values(StoreUnits).map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-theme-light-tertiary dark:text-theme-dark-tertiary">
          Цена
        </label>
        <input
          name="price"
          placeholder="Цена"
          type="number"
          value={product?.price}
          onChange={(e) =>
            handleChange(e.target.name as keyof StoreProduct, e.target.value)
          }
          className="mt-1 block w-full p-2 border border-theme-light-secondary dark:border-theme-dark-secondary rounded-md shadow-sm sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-theme-light-tertiary dark:text-theme-dark-tertiary">
          Процентно увеличение
        </label>
        <input
          name="percentage_increase"
          placeholder="Процентно увеличение"
          type="number"
          value={product?.percentage_increase}
          onChange={(e) =>
            handleChange(e.target.name as keyof StoreProduct, e.target.value)
          }
          className="mt-1 block w-full p-2 border border-theme-light-secondary dark:border-theme-dark-secondary rounded-md shadow-sm sm:text-sm"
        />
      </div>
      {ProductActions(submitHandler, setMode)}
    </div>
  );
};
