import { useEffect, useState } from "react";
import { StoreProduct } from "./types";

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
  onSubmit,
}: ProductEditorProps) => {
  const [product, setProduct] = useState<StoreProduct | undefined>(selected);

  const handleChange = (key: keyof StoreProduct, value: string | number) => {
    const updatedValue =
      key === "quantity" || key === "code" ? Number(value) : value;
    setProduct(
      (prev) =>
        prev && {
          ...prev,
          [key]: updatedValue,
        },
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Код</label>
        <p className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm">
          {product?.code}
        </p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Име</label>
        <input
          name="name"
          placeholder="Име"
          type="text"
          value={product?.name}
          onChange={(e) =>
            handleChange(e.target.name as keyof StoreProduct, e.target.value)
          }
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Опаковка
        </label>
        <p className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm">
          {product?.package}
        </p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
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
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
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
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="col-span-2 flex justify-end space-x-4">
        <button
          onClick={submitHandler}
          className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save
        </button>
        <button
          onClick={() => setEditMode(false)}
          className="px-4 py-2 bg-gray-600 text-white rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Cancel
        </button>
      </div>
    </div>
  ) : null;
};
