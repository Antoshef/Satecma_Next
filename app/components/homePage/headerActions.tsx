'use client';

import Link from 'next/link';
import { useState } from 'react';

export const HeaderActions = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
  };

  return (
    <div className="mt-4 flex gap-2">
      <Link
        href="/api/auth/login"
        onClick={handleClick}
        className="flex items-center bg-theme-light-quaternary px-8 py-2 rounded-lg text-theme-light-primary text-lg dark:bg-theme-dark-primary hover:bg-theme-light-primary hover:text-theme-light-white dark:hover:bg-theme-dark-secondary dark:hover:text-theme-dark-primary"
      >
        {isLoading ? (
          <span className="flex items-center">
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            Loading...
          </span>
        ) : (
          'Вход'
        )}
      </Link>
      <Link
        href=""
        className="border border-theme-light-white text-theme-light-white px-8 py-2 rounded-lg text-lg dark:border-theme-dark-primary dark:text-theme-dark-primary hover:bg-theme-light-white hover:text-theme-light-secondary dark:hover:bg-theme-dark-secondary dark:hover:text-theme-dark-primary"
      >
        Виж Демо
      </Link>
    </div>
  );
};
