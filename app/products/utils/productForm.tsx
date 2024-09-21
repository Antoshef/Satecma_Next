import { Dispatch, SetStateAction, useState } from 'react';
import { EncancedMode, Product } from './types';
import { GenericForm, GenericFormField } from './genericForm';
import { GenericInput } from '@/components/input';

interface ProductFormProps {
  product: Product | undefined;
  categories: string[];
  handleChange: (key: keyof Product, value: string | number) => void;
  submitHandler: () => void;
  setMode: Dispatch<SetStateAction<EncancedMode>>;
  ProductActions: (
    submitHandler: () => void,
    setMode: Dispatch<SetStateAction<EncancedMode>>
  ) => JSX.Element;
}

export const ProductForm = ({
  product,
  categories,
  handleChange,
  submitHandler,
  setMode,
  ProductActions
}: ProductFormProps) => {
  const [errors, setErrors] = useState<Partial<Record<keyof Product, string>>>(
    {}
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    product?.category || ''
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
      'sellPrice',
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

  const handleCategoryChange = (category: { name: string }) => {
    setSelectedCategory(category.name);
    handleChange('category', category.name);
  };

  const fields: GenericFormField<Product>[] = [
    {
      label: 'Код',
      defaultValue: product?.code || '',
      key: 'code',
      error: errors.code || '',
      type: 'text',
      hint: 'Кодът трябва да бъде уникален',
      required: true
    },
    {
      label: 'Име',
      defaultValue: product?.name || '',
      key: 'name',
      error: errors.name || '',
      type: 'text',
      hint: 'Въведете име на продукта',
      required: true
    },
    {
      label: 'Опаковка',
      defaultValue: product?.package || '',
      key: 'package',
      error: errors.package || '',
      type: 'number',
      hint: 'Въведете количеството което се съдържа във всяка опаковка',
      required: true
    },
    {
      label: 'Количество',
      defaultValue: product?.quantity || '',
      key: 'quantity',
      error: errors.quantity || '',
      type: 'number',
      hint: 'Въведете броя на опаковките',
      required: false
    },
    {
      label: 'Категория',
      defaultValue: selectedCategory || '',
      key: 'category',
      error: errors.category || '',
      type: 'text',
      hint: 'Изберете категория от списъка с категории или въведете нова',
      required: false,
      render: () => (
        <GenericInput
          data={categories.map((name) => ({ name }))}
          selectedItem={{ name: selectedCategory }}
          setSelectedItem={handleCategoryChange}
          displayProperty="name"
        />
      )
    },
    {
      label: 'Цвят',
      defaultValue: product?.color || '',
      key: 'color',
      error: errors.color || '',
      type: 'text',
      hint: 'Въведете цвят на продукта',
      required: false
    },
    {
      label: 'Мерна единица',
      defaultValue: product?.unit || '',
      key: 'unit',
      error: errors.unit || '',
      type: 'select',
      hint: 'Изберете единица за измерване, например кг, л, м2, мл и други подобни',
      options: [],
      required: true
    },
    {
      label: 'Продажна цена',
      defaultValue: product?.sellPrice || '',
      key: 'sellPrice',
      error: errors.sellPrice || '',
      type: 'number',
      hint: 'Въведете единична цена за вашия продукт, примерно за килограм или литър',
      required: true
    },
    {
      label: 'Процентно увеличение',
      defaultValue: product?.percentageIncrease || '',
      key: 'percentageIncrease',
      error: errors.percentageIncrease || '',
      type: 'number',
      hint: 'Въведете процентното увеличение, което искате да добавите към цената на продукта, за да изчислите продажната му цена',
      required: false
    },
    {
      label: 'Общо количество',
      defaultValue: product?.totalQuantity || '',
      key: 'totalQuantity',
      error: errors.totalQuantity || '',
      type: 'number',
      hint: 'Въведете общото количество на продукта, което имате в наличност',
      required: false
    }
  ];

  const handleFieldChange = (key: keyof Product, value: string | number) => {
    handleChange(key, value);
  };

  return (
    <GenericForm
      fields={fields}
      handleChange={handleFieldChange}
      ProductActions={ProductActions(handleSubmit, setMode)}
    />
  );
};
