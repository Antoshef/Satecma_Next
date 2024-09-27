'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import ClientSideNavigation from './clientSideNavigation';
import Tooltip from '../tooltip';

export interface NavigationItem {
  name: string;
  href?: string;
  subItems?: NavigationItem[];
}

const navigation: NavigationItem[] = [
  { name: 'Продукти', href: '/products' },
  { name: 'Клиенти', href: '/clients' },
  { name: 'Фактури', href: '/sent/invoices' },
  // { name: "Оферти", href: "/sent/offers" },
  {
    name: 'Създай',
    subItems: [
      { name: 'Фактура', href: '/create/invoice' },
      { name: 'Оферта', href: '/create/offer' }
    ]
  }
];

export default function SidePanel() {
  const [isNavOpen, setIsNavOpen] = useState(true);

  const toggleNav = () => setIsNavOpen((prev) => !prev);

  return (
    <div className="relative z-10 flex h-full">
      <nav
        className={`${isNavOpen ? 'w-64 bg-theme-light-primary dark:bg-theme-dark-background' : 'w-20 bg-theme-light-secondary'} transition-width duration-500 ease-in-out h-full fixed`}
      >
        {isNavOpen ? (
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 bg-theme-light-secondary dark:bg-theme-dark-secondary">
              <Link href="/profile">
                <span className="text-theme-light-white dark:text-theme-dark-primary text-lg font-semibold">
                  Твоето лого
                </span>
              </Link>
              <button
                onClick={toggleNav}
                className="top-4 left-4 z-20 p-2 rounded cursor-pointer transition-opacity duration-500 ease-in-out"
              >
                <Image
                  src="/assets/svg/close-sign.svg"
                  width={40}
                  height={40}
                  alt="close"
                  className={isNavOpen ? 'opacity-100' : 'opacity-0'}
                />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <ClientSideNavigation navigation={navigation} />
            </div>
            <div className="p-4 w-full">
              <Tooltip text="Изход">
                <Link
                  href="/api/auth/logout"
                  className={`text-theme-light-white rounded-md px-3 py-2 text-sm font-medium cursor-pointer uppercase block`}
                >
                  <Image
                    src="/assets/svg/logout.svg"
                    width={40}
                    height={40}
                    alt="logout"
                  />
                </Link>
              </Tooltip>
            </div>
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-between bg-theme-light-secondary dark:bg-theme-dark-secondary">
            <button
              onClick={toggleNav}
              className="p-4 transition-opacity duration-500 ease-in-out w-full"
            >
              <Image
                src="/assets/svg/open.svg"
                width={40}
                height={40}
                alt="open"
              />
            </button>
            <div className="w-full pl-2 pb-4">
              <Tooltip text="Изход">
                <Link
                  href="/api/auth/logout"
                  className={`rounded-md px-3 py-2 text-sm font-medium cursor-pointer uppercase block`}
                >
                  <Image
                    src="/assets/svg/logout.svg"
                    width={40}
                    height={40}
                    alt="logout"
                  />
                </Link>
              </Tooltip>
            </div>
          </div>
        )}
      </nav>
      <div
        className={`flex-1 p-4 ${isNavOpen ? 'ml-64' : 'ml-20'} transition-all duration-500 ease-in-out`}
      >
        {/* Main content goes here */}
      </div>
    </div>
  );
}
