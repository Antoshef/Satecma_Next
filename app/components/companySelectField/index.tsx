import { Company } from "@/create/invoice/constants";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useContext, useRef } from "react";
import { classNames } from "../header";
import { CompanyContext } from "@/ClientProviders";

const satecma =
  "https://satecma.bg/wp-content/uploads/2024/04/favico-transparent.png";
const eko =
  "https://satecma.bg/wp-content/uploads/2024/04/eco-home-group-logo-square.png";

export const CompanySelectField = () => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const { company, setCompany } = useContext(CompanyContext);

  // Function to trigger select box
  const handleClickLogo = () => {
    selectRef.current?.click();
  };

  const changeHandler = (value: Company) => {
    setCompany(value);
    localStorage.setItem("company", JSON.stringify(value));
  };

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="overflow-hidden relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open company menu</span>
          <Image
            width={40}
            height={40}
            alt={`${company}-logo`}
            src={company === Company.satecma ? satecma : eko}
            onClick={handleClickLogo}
            className="w-full h-full object-contain"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          defaultValue={company}
          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <Menu.Item>
            {({ active }) => (
              <span
                className={classNames([
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700",
                ])}
                onClick={() => changeHandler(Company.satecma)}
              >
                Satecma
              </span>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <span
                className={classNames([
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700",
                ])}
                onClick={() => changeHandler(Company.ekoHome)}
              >
                Eko Home
              </span>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
