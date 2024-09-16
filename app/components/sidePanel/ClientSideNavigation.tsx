'use client'; // Required to make this a client component

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import SubMenu from './subMenu';
import { classNames } from '@/utils/classNames';

export interface NavigationItem {
  name: string;
  href?: string;
  subItems?: NavigationItem[];
}

export default function ClientSideNavigation({
  navigation
}: {
  navigation: NavigationItem[];
}) {
  const pathname = usePathname(); // Get the current route from Next.js

  return (
    <div
      role="navigation"
      className="flex flex-col space-y-1 p-4 bg-theme-light-background dark:bg-theme-dark-background"
    >
      {navigation.map((item) =>
        item.subItems ? (
          <SubMenu key={item.name} name={item.name} subItems={item.subItems} />
        ) : (
          <Link
            key={item.name}
            href={item.href || '#'}
            className={classNames([
              'rounded-md px-3 py-2 text-sm font-medium uppercase cursor-pointer',
              pathname === item.href
                ? 'bg-theme-light-secondary dark:bg-theme-dark-secondary text-theme-light-primary dark:text-theme-dark-primary'
                : 'text-theme-light-tertiary dark:text-theme-dark-tertiary hover:bg-theme-light-secondary dark:hover:bg-theme-dark-secondary hover:text-theme-light-primary dark:hover:text-theme-dark-primary'
            ])}
          >
            {item.name}
          </Link>
        )
      )}
    </div>
  );
}
