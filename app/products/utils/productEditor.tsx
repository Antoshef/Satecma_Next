import {
  GenericForm,
  GenericFormField
} from '@/components/genericTable/genericForm';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { EnhancedMode, Product } from './types';

const ProductActions = (
  submitHandler: () => void,
  setMode: Dispatch<SetStateAction<EnhancedMode>>
) => (
  <div className="col-span-2 flex justify-end space-x-4">
    <button
      onClick={() => setMode(EnhancedMode.None)}
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
  mode: EnhancedMode;
  categories: string[];
  setMode: Dispatch<SetStateAction<EnhancedMode>>;
  onSubmit: (product: Product) => Promise<void>;
}

export const ProductEditor = ({
  mode = EnhancedMode.None,
  selected,
  setMode,
  onSubmit
}: ProductEditorProps) => {
  const [product, setProduct] = useState<Product | undefined>();
  const [errors, setErrors] = useState<Partial<Record<keyof Product, string>>>(
    {}
  );

  const handleChange = (key: keyof Product, value: string | number) => {
    setProduct(
      (prev) =>
        prev && {
          ...prev,
          [key]: value
        }
    );
  };

  const validateFields = () => {
    const newErrors: Partial<Record<keyof Product, string>> = {};
    const requiredFields: (keyof Product)[] = [
      'code',
      'name',
      'packing',
      'quantity',
      'category',
      'unit',
      'color',
      'percentageIncrease',
      'sellPrice'
    ];

    requiredFields.forEach((field) => {
      if (!product || !product[field]) {
        newErrors[field] = 'Полето не може да бъде празно';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateFields() && product) {
      onSubmit(product);
      if (mode === EnhancedMode.Create) {
        setProduct(undefined);
      } else if (mode === EnhancedMode.Edit) {
        setMode(EnhancedMode.None);
      }
    }
  };

  const fields: GenericFormField<Product>[] = [
    {
      label: 'Код',
      defaultValue: product?.code || '',
      name: 'code',
      error: errors.code || '',
      type: 'text',
      hint:
        mode === EnhancedMode.Edit
          ? 'Кодът не може да бъде променен след като веднъж е създаден.'
          : 'Кодът трябва да бъде уникален',
      required: true,
      disabled: mode === EnhancedMode.Edit
    },
    {
      label: 'Име',
      defaultValue: product?.name || '',
      name: 'name',
      error: errors.name || '',
      type: 'text',
      hint: 'Въведете име на продукта',
      required: true
    },
    {
      label: 'Мерна единица',
      defaultValue: product?.unit || '',
      name: 'unit',
      error: errors.unit || '',
      type: 'select',
      hint: 'Изберете единица за измерване, например кг, л, м2, мл и други подобни',
      options: ['л', 'кг', 'м2', 'м3', 'бр'],
      required: true
    },
    {
      label: 'Опаковка',
      defaultValue: product?.packing || '',
      name: 'packing',
      error: errors.packing || '',
      type: 'number',
      hint: 'Размер на опаковката на всеки продукт',
      required: true
    },
    {
      label: 'Количество',
      defaultValue: product?.quantity || '',
      name: 'quantity',
      error: errors.quantity || '',
      type: 'number',
      hint: 'Въведете броя на опаковките',
      required: false
    },
    {
      label: 'Цвят',
      defaultValue: product?.color || '',
      name: 'color',
      error: errors.color || '',
      type: 'text',
      hint: 'Въведете цвят на продукта',
      required: false
    },
    {
      label: 'Доставна цена',
      defaultValue: product?.buyPrice || '',
      name: 'buyPrice',
      error: errors.buyPrice || '',
      type: 'number',
      hint: 'Доставна единична цена за опаковка',
      required: false
    },
    {
      label: 'Процентно увеличение',
      defaultValue: product?.percentageIncrease || '',
      name: 'percentageIncrease',
      error: errors.percentageIncrease || '',
      type: 'number',
      hint: 'Въведете процентното увеличение, което искате да добавите към цената на продукта, за да изчислите продажната му цена',
      required: false
    },
    {
      label: 'Продажна цена',
      defaultValue: product?.sellPrice || '',
      name: 'sellPrice',
      error: errors.sellPrice || '',
      type: 'number',
      hint: 'Единична продажна цена за опаковка',
      required: true
    },
    {
      label: 'Категория',
      defaultValue: product?.category || '',
      name: 'category',
      error: errors.category || '',
      type: 'select',
      options: ['Други'],
      hint: 'Изберете категория от списъка с категории или въведете нова',
      required: false
    }
  ];

  const handleFieldChange = (name: keyof Product, value: string | number) => {
    handleChange(name, value);
  };

  useEffect(() => {
    switch (mode) {
      case EnhancedMode.Create:
        setProduct({
          code: '',
          name: '',
          category: 'Други',
          packing: 1,
          unit: 'л',
          color: '',
          buyPrice: 0,
          sellPrice: 1,
          percentageIncrease: 100,
          quantity: 0
        });
        break;
      case EnhancedMode.Edit:
        setProduct(selected);
        break;
      default:
        break;
    }
  }, [selected, mode]);

  return (
    <>
      {(mode === EnhancedMode.Create || mode === EnhancedMode.Edit) && (
        <GenericForm
          fields={fields}
          handleChange={handleFieldChange}
          ProductActions={ProductActions(handleSubmit, setMode)}
        />
      )}
      {mode === EnhancedMode.None && null}
    </>
  );
};
