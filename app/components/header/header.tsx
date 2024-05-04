"use client";
import { useEffect, useRef, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { CompanySelectField } from "../companySelectField/CompanySelectField";

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

export default function Header() {
  const router = useRouter();
  const [value, setValue] = useState<string>("/store");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpenDropdown(null);
    }
  };

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const handleChange = (path: string) => {
    setValue(path);
    router.push(path);
    setOpenDropdown(null);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setValue(window.location.pathname);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch">
                <div className="hidden sm:ml-6 sm:block">
                  <div role="navigation" className="flex space-x-4">
                    {navigation.map((item) => (
                      <div key={item.name} className="relative">
                        <a
                          href={item.href}
                          className={classNames([
                            value === item.href
                              ? "bg-gray-900 text-white uppercase"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium cursor-pointer uppercase",
                          ])}
                          aria-current={
                            value === item.href ? "page" : undefined
                          }
                          onClick={() => {
                            item.href && handleChange(item.href);
                            toggleDropdown(item.name);
                          }}
                        >
                          {item.name}
                        </a>
                        {openDropdown === item.name && item.subItems && (
                          <div
                            ref={dropdownRef}
                            className="absolute left-0 mt-1 rounded-md shadow-lg bg-white"
                          >
                            <div className="py-1">
                              {item.subItems.map((subItem) => (
                                <a
                                  key={subItem.name}
                                  href={subItem.href}
                                  className={classNames([
                                    value === subItem.href
                                      ? "bg-gray-200"
                                      : "hover:bg-gray-100",
                                    "block px-4 py-2 text-sm text-gray-700",
                                  ])}
                                  onClick={() => {
                                    subItem.href && handleChange(subItem.href);
                                  }}
                                >
                                  {subItem.name}
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
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
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <CompanySelectField />
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) =>
                item.subItems?.length ? (
                  item.subItems.map((subitem) => (
                    <Disclosure.Button
                      key={subitem.name}
                      as="a"
                      href={subitem.href}
                      className={classNames([
                        value === subitem.href
                          ? "bg-gray-900 text-white uppercase"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium uppercase",
                      ])}
                      aria-current={value === subitem.href ? "page" : undefined}
                      onClick={() => subitem.href && handleChange(subitem.href)}
                    >
                      {subitem.name}
                    </Disclosure.Button>
                  ))
                ) : (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames([
                      value === item.href
                        ? "bg-gray-900 text-white uppercase"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium uppercase",
                    ])}
                    aria-current={value === item.href ? "page" : undefined}
                    onClick={() => item.href && handleChange(item.href)}
                  >
                    {item.name}
                  </Disclosure.Button>
                )
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
