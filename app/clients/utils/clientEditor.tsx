import {
  GenericForm,
  GenericFormField
} from '@/components/genericTable/genericForm';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Client } from './types';
import { EnhancedMode } from '@/products/utils/types';
import { GenericFormActions } from '@/components/genericTable/genericFormActions';
import React from 'react';

interface ClientEditorProps {
  selected?: Client;
  mode: EnhancedMode;
  setMode: Dispatch<SetStateAction<EnhancedMode>>;
  onSubmit: (client: Client) => Promise<void>;
}

export const ClientEditor = ({
  mode = EnhancedMode.None,
  selected,
  setMode,
  onSubmit
}: ClientEditorProps) => {
  const [client, setClient] = useState<Client | undefined>();
  const [errors, setErrors] = useState<Partial<Record<keyof Client, string>>>(
    {}
  );

  const handleChange = (key: keyof Client, value: string | number) => {
    setClient(
      (prev) =>
        prev && {
          ...prev,
          [key]: value
        }
    );
  };

  const validateFields = () => {
    const newErrors: Partial<Record<keyof Client, string>> = {};
    const requiredFields: (keyof Client)[] = [
      'name',
      'city',
      'address',
      'eik',
      'vat',
      'director',
      'email',
      'phone'
    ];

    requiredFields.forEach((field) => {
      if (!client || !client[field]) {
        newErrors[field] = 'Полето не може да бъде празно';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    try {
      if (validateFields() && client) {
        await onSubmit(client);
        if (mode === EnhancedMode.Create) {
          setClient(undefined);
        } else if (mode === EnhancedMode.Edit) {
          setMode(EnhancedMode.None);
        }
      }
    } catch (err) {
      console.error('Грешка при запис на клиент:', err);
    }
  };

  const fields: GenericFormField<Client>[] = [
    {
      label: 'Име',
      defaultValue: client?.name || '',
      name: 'name',
      error: errors.name || '',
      type: 'text',
      hint: 'Въведете име на клиента',
      required: true
    },
    {
      label: 'Град',
      defaultValue: client?.city || '',
      name: 'city',
      error: errors.city || '',
      type: 'text',
      hint: 'Въведете град на клиента',
      required: true
    },
    {
      label: 'Адрес',
      defaultValue: client?.address || '',
      name: 'address',
      error: errors.address || '',
      type: 'text',
      hint: 'Въведете адрес на клиента',
      required: true
    },
    {
      label: 'ЕИК',
      defaultValue: client?.eik || '',
      name: 'eik',
      error: errors.eik || '',
      type: 'text',
      hint:
        mode === EnhancedMode.Edit
          ? 'ЕИК не може да бъде променен след като веднъж е създаден.'
          : 'ЕИК трябва да бъде уникален',
      required: true,
      disabled: mode === EnhancedMode.Edit
    },
    {
      label: 'ДДС №',
      defaultValue: client?.vat || '',
      name: 'vat',
      error: errors.vat || '',
      type: 'text',
      hint: 'Въведете ДДС № на клиента',
      required: true,
      disabled: mode === EnhancedMode.Edit
    },
    {
      label: 'Директор',
      defaultValue: client?.director || '',
      name: 'director',
      error: errors.director || '',
      type: 'text',
      hint: 'Въведете име на директора на клиента',
      required: true
    },
    {
      label: 'Е-Поща',
      defaultValue: client?.email || '',
      name: 'email',
      error: errors.email || '',
      type: 'text',
      hint: 'Въведете е-поща на клиента',
      required: true
    },
    {
      label: 'Телефон',
      defaultValue: client?.phone || '',
      name: 'phone',
      error: errors.phone || '',
      type: 'text',
      hint: 'Въведете телефон на клиента',
      required: true
    }
  ];

  const handleFieldChange = (name: keyof Client, value: string | number) => {
    handleChange(name, value);
  };

  useEffect(() => {
    switch (mode) {
      case EnhancedMode.Create:
        setClient({
          name: '',
          city: '',
          address: '',
          eik: '',
          vat: '',
          director: '',
          email: '',
          phone: ''
        });
        break;
      case EnhancedMode.Edit:
        setClient(selected);
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
          ProductActions={GenericFormActions(handleSubmit, setMode)}
        />
      )}
      {mode === EnhancedMode.None && null}
    </>
  );
};
