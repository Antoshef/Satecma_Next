import Link from "next/link";
import SubMenu from "./subMenu";
import { getSession } from "@auth0/nextjs-auth0";

export function classNames(classes: string[]) {
  return [...(classes || "")].filter(Boolean).join(" ");
}

export interface NavigationItem {
  name: string;
  href?: string;
  subItems?: NavigationItem[];
}

const navigation: NavigationItem[] = [
  { name: "Склад", href: "/store" },
  { name: "Клиенти", href: "/clients" },
  { name: "Фактури", href: "/sent/invoices" },
  // { name: "Оферти", href: "/sent/offers" },
  {
    name: "Създай",
    subItems: [
      { name: "Фактура", href: "/create/invoice" },
      { name: "Оферта", href: "/create/offer" },
    ],
  },
];

export default async function SidePanel() {
  const session = await getSession();

  if (!session) {
    return null;
  }

  return (
    <div className="relative z-10 flex h-full">
      <nav className="bg-gray-800 w-64 h-full fixed">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 bg-gray-900">
            <Link href="/profile">
              <span className="text-white text-lg font-semibold">
                Твоето лого
              </span>
            </Link>
            <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
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
            <div role="navigation" className="flex flex-col space-y-1 p-4">
              {navigation.map((item) =>
                item.subItems ? (
                  <SubMenu
                    key={item.name}
                    name={item.name}
                    subItems={item.subItems}
                  />
                ) : (
                  <Link
                    key={item.name}
                    href={item.href || "#"}
                    className={classNames([
                      "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium cursor-pointer uppercase",
                    ])}
                  >
                    {item.name}
                  </Link>
                ),
              )}
            </div>
          </div>
          <div className="p-4 w-full">
            <Link
              href="/api/auth/logout"
              className={classNames([
                "text-gray-300 hover:bg-gray-700 hover:text-white",
                "rounded-md px-3 py-2 text-sm font-medium cursor-pointer uppercase block",
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
