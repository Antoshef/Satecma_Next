import Link from "next/link";
import UserSelect from "./UserSelect";
import SubMenu from "../subMenu";

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
  {
    name: "Създай",
    subItems: [
      { name: "Фактура", href: "/create#invoice" },
      { name: "Оферта", href: "/create#offer" },
    ],
  },
];

export default async function Navbar() {
  return (
    <div className="relative z-10">
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button */}
              <button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
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
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch">
              <div className="hidden sm:ml-6 sm:block">
                <div role="navigation" className="flex space-x-4">
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
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                type="button"
                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
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

              {/* Profile dropdown */}
              <UserSelect />
            </div>
          </div>
        </div>

        <div className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) =>
              item.subItems?.length ? (
                item.subItems.map((subitem) => (
                  <a
                    key={subitem.name}
                    href={subitem.href}
                    className={classNames([
                      "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium uppercase",
                    ])}
                  >
                    {subitem.name}
                  </a>
                ))
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames([
                    "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium uppercase",
                  ])}
                >
                  {item.name}
                </a>
              ),
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
