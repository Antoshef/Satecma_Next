'use client';

import React, { useState, useEffect } from 'react';
import { Company } from '@/create/invoice/types';
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';

interface ProfileDetailsProps {
  company?: Company;
}

const inputFields = [
  { name: 'name', label: 'Компания' },
  { name: 'eik', label: 'ЕИК' },
  { name: 'vat', label: 'ДДС' },
  { name: 'city', label: 'Град' },
  { name: 'address', label: 'Адрес' },
  { name: 'director', label: 'Директор' },
  { name: 'phone', label: 'Телефон' },
  { name: 'bankName', label: 'Име на банката' },
  { name: 'iban', label: 'IBAN' },
  { name: 'swift', label: 'SWIFT' }
];

export const ProfileDetails: React.FC<ProfileDetailsProps> = ({ company }) => {
  const { user, isLoading } = useUser();
  const [formData, setFormData] = useState<Company | undefined>(undefined);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(
      (prevData) =>
        ({
          ...prevData,
          [name]: value || ''
        }) as Company
    );
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
      } else {
        console.error('Failed to upload logo');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/profile/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      console.error('Failed to update profile');
    }
  };

  useEffect(() => {
    if (company) {
      setFormData(company);
    }
  }, [company]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="bg-theme-light-background dark:bg-theme-dark-background shadow-md rounded-lg p-6 max-w-4xl mx-auto mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* User Data Column */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-theme-light-primary dark:text-theme-dark-primary">
            Информация за потребителя
          </h2>
          <div className="grid grid-cols-1 gap-2">
            <div className="text-center">
              <strong>Профилна снимка</strong>
            </div>
            <div className="flex justify-center">
              <Image
                src={user?.picture || ''}
                alt={user?.name || ''}
                className="w-24 h-24 rounded-full"
                width={96}
                height={96}
                priority
              />
            </div>
            <div className="text-center">
              <strong>Име:</strong> {user?.name || ''}
            </div>
            <div className="text-center">
              <strong>Имейл:</strong> {user?.email || ''}
            </div>
            <div className="text-center">
              <strong>Псевдоним:</strong> {user?.nickname || ''}
            </div>
            {user?.email_verified && (
              <div className="text-center">Имейлът е потвърден</div>
            )}
            <div className="text-center mt-4">
              <label className="block text-sm font-medium text-theme-light-secondary dark:text-theme-dark-quaternary">
                Качване на лого
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="mt-1 block w-full p-2 border border-theme-light-secondary dark:border-theme-dark-quaternary rounded-md shadow-sm focus:ring-theme-light-primary focus:border-theme-light-primary sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Provider Data Column */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-theme-light-primary dark:text-theme-dark-primary">
            Информация за компанията
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4">
              {inputFields.map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-theme-light-secondary dark:text-theme-dark-quaternary">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    name={field.name}
                    value={
                      formData ? formData[field.name as keyof Company] : ''
                    }
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-theme-light-secondary dark:border-theme-dark-quaternary rounded-md shadow-sm focus:ring-theme-light-primary focus:border-theme-light-primary sm:text-sm"
                  />
                </div>
              ))}
              <div>
                <button
                  type="submit"
                  className="w-full bg-theme-light-primary dark:bg-theme-dark-primary text-white py-2 px-4 rounded-md shadow-sm hover:bg-theme-light-secondary dark:hover:bg-theme-dark-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-light-primary dark:focus:ring-theme-dark-primary"
                >
                  Актуализиране на профила
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
