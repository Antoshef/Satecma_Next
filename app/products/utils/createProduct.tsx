import { Dispatch, SetStateAction, useState } from 'react';
import { EncancedMode, StoreProduct, StoreUnits } from './types';
import { GenericForm, GenericFormField } from './genericForm';

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
  const [errors, setErrors] = useState<
    Partial<Record<keyof StoreProduct, string>>
  >({});

  const validateFields = () => {
    const newErrors: Partial<Record<keyof StoreProduct, string>> = {};
    const requiredFields: (keyof StoreProduct)[] = [
      'code',
      'name',
      'package',
      'quantity',
      'category',
      'unit',
      'color',
      'packagePrice',
      'percentage_increase',
      'price',
      'totalQuantity'
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
    if (validateFields()) {
      submitHandler();
    }
  };

  const fields: GenericFormField[] = [
    {
      label: 'Код',
      defaultValue: product?.code || '',
      error: errors.code || '',
      type: 'number'
    },
    {
      label: 'Име',
      defaultValue: product?.name || '',
      error: errors.name || '',
      type: 'text'
    },
    {
      label: 'Опаковка',
      defaultValue: product?.package || '',
      error: errors.package || '',
      type: 'number'
    },
    {
      label: 'Количество',
      defaultValue: product?.quantity || '',
      error: errors.quantity || '',
      type: 'number'
    },
    {
      label: 'Категория',
      defaultValue: product?.category || '',
      error: errors.category || '',
      type: 'text'
    },
    {
      label: 'Цвят',
      defaultValue: product?.color || '',
      error: errors.color || '',
      type: 'text'
    },
    {
      label: 'Единица',
      defaultValue: product?.unit || '',
      error: errors.unit || '',
      type: 'select',
      options: Object.values(StoreUnits)
    },
    {
      label: 'Цена',
      defaultValue: product?.price || '',
      error: errors.price || '',
      type: 'number'
    },
    {
      label: 'Процентно увеличение',
      defaultValue: product?.percentage_increase || '',
      error: errors.percentage_increase || '',
      type: 'number'
    },
    {
      label: 'Цена на опаковка',
      defaultValue: product?.packagePrice || '',
      error: errors.packagePrice || '',
      type: 'number'
    },
    {
      label: 'Общо количество',
      defaultValue: product?.totalQuantity || '',
      error: errors.totalQuantity || '',
      type: 'number'
    }
  ];

  const handleFieldChange = (index: number, value: string | number) => {
    const fieldKey = Object.keys(product || {})[index] as keyof StoreProduct;
    handleChange(fieldKey, value);
  };

  return (
    <GenericForm
      fields={fields}
      handleChange={handleFieldChange}
      ProductActions={ProductActions(handleSubmit, setMode)}
    />
  );
};
