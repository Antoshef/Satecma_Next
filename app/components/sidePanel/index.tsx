import Link from 'next/link';
import { getSession } from '@auth0/nextjs-auth0';
import { classNames } from '@/utils/classNames';
import ClientSideNavigation from './ClientSideNavigation';

export interface NavigationItem {
  name: string;
  href?: string;
  subItems?: NavigationItem[];
}

const navigation: NavigationItem[] = [
  { name: 'Склад', href: '/store' },
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

export default async function SidePanel() {
  const session = await getSession();

  if (!session) {
    return null;
  }

  return (
    <div className="relative z-10 flex h-full">
      <nav className="bg-theme-light-background dark:bg-theme-dark-background w-64 h-full fixed">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 bg-theme-light-secondary dark:bg-theme-dark-secondary">
            <Link href="/profile">
              <span className="text-theme-light-primary dark:text-theme-dark-primary text-lg font-semibold">
                Твоето лого
              </span>
            </Link>
            <button
              type="button"
              className="relative rounded-full bg-theme-light-background dark:bg-theme-dark-background p-1 text-theme-light-tertiary dark:text-theme-dark-tertiary hover:text-theme-light-primary dark:hover:text-theme-dark-primary focus:outline-none focus:ring-2 focus:ring-theme-light-primary dark:focus:ring-theme-dark-primary focus:ring-offset-2 focus:ring-offset-theme-light-background dark:focus:ring-offset-theme-dark-background"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">Виж съобщения</span>
              <svg
                className="h-6 w-6"
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
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <ClientSideNavigation navigation={navigation} />
          </div>
          <div className="p-4 w-full">
            <Link
              href="/api/auth/logout"
              className={classNames([
                'text-theme-light-tertiary dark:text-theme-dark-tertiary hover:bg-theme-light-secondary dark:hover:bg-theme-dark-secondary hover:text-theme-light-primary dark:hover:text-theme-dark-primary',
                'rounded-md px-3 py-2 text-sm font-medium cursor-pointer uppercase block'
              ])}
            >
              Изход
            </Link>
          </div>
        </div>
      </nav>
      <div className="flex-1 p-4 ml-64">{/* Main content goes here */}</div>
    </div>
  );
}
