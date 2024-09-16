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
          'text-gray-300 hover:bg-gray-700 hover:text-white',
          'rounded-md w-full justify-between px-3 py-2 text-sm font-medium cursor-pointer uppercase flex items-center'
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
        <div className="mt-1 rounded-md shadow-lg text-gray-300">
          <div className="py-1">
            {subItems.map((subItem) => (
              <Link
                key={subItem.name}
                href={subItem.href || '#'}
                className={classNames([
                  'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'rounded-md pl-4 pr-3 py-2 text-sm font-medium cursor-pointer capitalize block'
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
