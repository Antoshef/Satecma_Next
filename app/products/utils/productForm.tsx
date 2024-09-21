import { Dispatch, SetStateAction, useState } from 'react';
import { EncancedMode, Product } from './types';
import { GenericForm, GenericFormField } from './genericForm';

interface ProductFormProps {
  product: Product | undefined;
  categories: string[];
  handleChange: (name: keyof Product, value: string | number) => void;
  submitHandler: () => void;
  setMode: Dispatch<SetStateAction<EncancedMode>>;
  ProductActions: (
    submitHandler: () => void,
    setMode: Dispatch<SetStateAction<EncancedMode>>
  ) => JSX.Element;
}

export const ProductForm = ({
  product,
  handleChange,
  submitHandler,
  setMode,
  ProductActions
}: ProductFormProps) => {
  const [errors, setErrors] = useState<Partial<Record<keyof Product, string>>>(
    {}
  );

  const validateFields = () => {
    const newErrors: Partial<Record<keyof Product, string>> = {};
    const requiredFields: (keyof Product)[] = [
      'code',
      'name',
      'package',
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
    if (validateFields()) {
      submitHandler();
    }
  };

  const fields: GenericFormField<Product>[] = [
    {
      label: 'Код',
      defaultValue: product?.code || '',
      name: 'code',
      error: errors.code || '',
      type: 'text',
      hint: 'Кодът трябва да бъде уникален',
      required: true
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
      defaultValue: product?.package || '',
      name: 'package',
      error: errors.package || '',
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
    console.log(name, value, 'FIELD');
    handleChange(name, value);
  };

  return (
    <GenericForm
      fields={fields}
      handleChange={handleFieldChange}
      ProductActions={ProductActions(handleSubmit, setMode)}
    />
  );
};
