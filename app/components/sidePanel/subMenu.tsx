'use client';

import Link from 'next/link';
import { useState } from 'react';
import { NavigationItem } from './ClientSideNavigation';
import { classNames } from '@/utils/classNames';

interface SubMenuProps {
  name: string;
  subItems: Pick<NavigationItem, 'name' | 'href'>[];
}

const SubMenu: React.FC<SubMenuProps> = ({ name, subItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSubMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleSubMenu}
        className={classNames([
          'rounded-md w-full justify-between px-3 py-2 text-sm font-medium cursor-pointer uppercase flex items-center',
          'text-theme-light-white dark:text-theme-dark-tertiary hover:bg-theme-light-secondary dark:hover:bg-theme-dark-secondary hover:text-theme-light-white dark:hover:text-theme-dark-primary'
        ])}
      >
        {name}
        <svg
          className="ml-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="mt-1 rounded-md shadow-lg">
          <div className="py-1">
            {subItems.map((subItem) => (
              <Link
                key={subItem.name}
                href={subItem.href || '#'}
                className={classNames([
                  'rounded-md pl-4 pr-3 py-2 text-sm font-medium cursor-pointer capitalize block',
                  'text-theme-light-white dark:text-theme-dark-tertiary hover:bg-theme-light-secondary dark:hover:bg-theme-dark-secondary hover:text-theme-light-white dark:hover:text-theme-dark-primary'
                ])}
              >
                {subItem.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubMenu;
