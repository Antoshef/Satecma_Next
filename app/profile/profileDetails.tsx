'use client';

import React, { useState } from 'react';
import { Company } from '@/create/invoice/types';
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';

interface ProfileDetailsProps {
  companies: Company;
}

export const ProfileDetails: React.FC<ProfileDetailsProps> = ({
  companies
}) => {
  const { user, isLoading } = useUser();
  const [formData, setFormData] = useState<Company>(companies);
  const [theme, setTheme] = useState<string>('light');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3000/api/profile/update', {
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

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');

    // Update the theme preference on the backend
    await fetch('http://localhost:3000/api/user/theme', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ theme: newTheme })
    });
  };

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
            <div className="text-center">
              <strong>Имейлът е потвърден:</strong>{' '}
              {user?.email_verified ? 'Да' : 'Не'}
            </div>
            {/* Theme Switcher Button */}
            <div className="text-center mt-4">
              <button
                onClick={toggleTheme}
                className="px-4 py-2 rounded-lg bg-theme-light-primary dark:bg-theme-dark-secondary text-white"
              >
                Превключване на тема (Текуща:{' '}
                {theme === 'light' ? 'Светла' : 'Тъмна'})
              </button>
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
              <div>
                <label className="block text-sm font-medium text-theme-light-tertiary dark:text-theme-dark-quaternary">
                  Компания
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-theme-light-secondary dark:border-theme-dark-quaternary rounded-md shadow-sm focus:ring-theme-light-primary focus:border-theme-light-primary sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-theme-light-tertiary dark:text-theme-dark-quaternary">
                  ЕИК
                </label>
                <input
                  type="text"
                  name="eik"
                  value={formData.eik}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-theme-light-secondary dark:border-theme-dark-quaternary rounded-md shadow-sm focus:ring-theme-light-primary focus:border-theme-light-primary sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-theme-light-tertiary dark:text-theme-dark-quaternary">
                  ДДС
                </label>
                <input
                  type="text"
                  name="VAT"
                  value={formData.VAT}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-theme-light-secondary dark:border-theme-dark-quaternary rounded-md shadow-sm focus:ring-theme-light-primary focus:border-theme-light-primary sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-theme-light-tertiary dark:text-theme-dark-quaternary">
                  Град
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-theme-light-secondary dark:border-theme-dark-quaternary rounded-md shadow-sm focus:ring-theme-light-primary focus:border-theme-light-primary sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-theme-light-tertiary dark:text-theme-dark-quaternary">
                  Адрес
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-theme-light-secondary dark:border-theme-dark-quaternary rounded-md shadow-sm focus:ring-theme-light-primary focus:border-theme-light-primary sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-theme-light-tertiary dark:text-theme-dark-quaternary">
                  Директор
                </label>
                <input
                  type="text"
                  name="director"
                  value={formData.director}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-theme-light-secondary dark:border-theme-dark-quaternary rounded-md shadow-sm focus:ring-theme-light-primary focus:border-theme-light-primary sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-theme-light-tertiary dark:text-theme-dark-quaternary">
                  Телефон
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-theme-light-secondary dark:border-theme-dark-quaternary rounded-md shadow-sm focus:ring-theme-light-primary focus:border-theme-light-primary sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-theme-light-tertiary dark:text-theme-dark-quaternary">
                  Име на банката
                </label>
                <input
                  type="text"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-theme-light-secondary dark:border-theme-dark-quaternary rounded-md shadow-sm focus:ring-theme-light-primary focus:border-theme-light-primary sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-theme-light-tertiary dark:text-theme-dark-quaternary">
                  IBAN
                </label>
                <input
                  type="text"
                  name="iban"
                  value={formData.iban}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-theme-light-secondary dark:border-theme-dark-quaternary rounded-md shadow-sm focus:ring-theme-light-primary focus:border-theme-light-primary sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-theme-light-tertiary dark:text-theme-dark-quaternary">
                  SWIFT
                </label>
                <input
                  type="text"
                  name="swift"
                  value={formData.swift}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-theme-light-secondary dark:border-theme-dark-quaternary rounded-md shadow-sm focus:ring-theme-light-primary focus:border-theme-light-primary sm:text-sm"
                />
              </div>
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
