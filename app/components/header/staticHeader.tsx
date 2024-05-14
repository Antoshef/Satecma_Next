import { Bars3Icon } from "@heroicons/react/24/outline";
import Link from "next/link";

export interface NavigationItem {
  name: string;
  href?: string;
  subItems?: NavigationItem[];
}

const navigation: NavigationItem[] = [
  { name: "Склад", href: "/store" },
  {
    name: "Създай",
    subItems: [
      { name: "Фактура", href: "/create#invoice" },
      { name: "Оферта", href: "/create#offer" },
    ],
  },
  {
    name: "Логистика",
    href: "/spedition",
  },
];

export default function StaticHeader() {
  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button placeholder */}
            <span className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400">
              <span className="absolute -inset-0.5" />
              <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
            </span>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch">
            <div className="hidden sm:ml-6 sm:block">
              <div role="navigation" className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href || "#"}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium uppercase"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
