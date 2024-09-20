import { Dispatch, SetStateAction, useState } from 'react';
import { EncancedMode, StoreProduct, StoreUnits } from './types';
import { GenericForm, GenericFormField } from './genericForm';
import { GenericInput } from '@/components/input';

interface ProductFormProps {
  product: StoreProduct | undefined;
  categories: string[];
  handleChange: (key: keyof StoreProduct, value: string | number) => void;
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
  const [errors, setErrors] = useState<
    Partial<Record<keyof StoreProduct, string>>
  >({});
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    product?.category || ''
  );

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

  const handleCategoryChange = (category: { name: string }) => {
    setSelectedCategory(category.name);
    handleChange('category', category.name);
  };

  const fields: GenericFormField<StoreProduct>[] = [
    {
      label: 'Код',
      defaultValue: product?.code || '',
      key: 'code',
      error: errors.code || '',
      type: 'text',
      hint: 'Кодът трябва да бъде уникален'
    },
    {
      label: 'Име',
      defaultValue: product?.name || '',
      key: 'name',
      error: errors.name || '',
      type: 'text',
      hint: 'Въведете име на продукта'
    },
    {
      label: 'Опаковка',
      defaultValue: product?.package || '',
      key: 'package',
      error: errors.package || '',
      type: 'number',
      hint: 'Въведете количеството което се съдържа във всяка опаковка'
    },
    {
      label: 'Количество',
      defaultValue: product?.quantity || '',
      key: 'quantity',
      error: errors.quantity || '',
      type: 'number',
      hint: 'Въведете броя на опаковките'
    },
    {
      label: 'Категория',
      defaultValue: selectedCategory || '',
      key: 'category',
      error: errors.category || '',
      type: 'text',
      hint: 'Изберете категория от списъка с категории или въведете нова',
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
      hint: 'Въведете цвят на продукта'
    },
    {
      label: 'Единица',
      defaultValue: product?.unit || '',
      key: 'unit',
      error: errors.unit || '',
      type: 'select',
      hint: 'Изберете единица за измерване, например кг, л, м2, мл и други подобни',
      options: Object.values(StoreUnits)
    },
    {
      label: 'Цена',
      defaultValue: product?.price || '',
      key: 'price',
      error: errors.price || '',
      type: 'number',
      hint: 'Въведете единична цена за вашия продукт, примерно за килограм или литър'
    },
    {
      label: 'Процентно увеличение',
      defaultValue: product?.percentage_increase || '',
      key: 'percentage_increase',
      error: errors.percentage_increase || '',
      type: 'number',
      hint: 'Въведете процентното увеличение, което искате да добавите към цената на продукта, за да изчислите продажната му цена'
    },
    {
      label: 'Цена на опаковка',
      defaultValue: product?.packagePrice || '',
      key: 'packagePrice',
      error: errors.packagePrice || '',
      type: 'number',
      hint: 'Въведете цената на опаковката, която сте закупили'
    },
    {
      label: 'Общо количество',
      defaultValue: product?.totalQuantity || '',
      key: 'totalQuantity',
      error: errors.totalQuantity || '',
      type: 'number',
      hint: 'Въведете общото количество на продукта, което имате в наличност'
    }
  ];

  const handleFieldChange = (
    key: keyof StoreProduct,
    value: string | number
  ) => {
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
