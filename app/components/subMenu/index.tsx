"use client";

import { useState } from "react";
import Link from "next/link";
import { classNames, NavigationItem } from "../navbar";

interface SubMenuProps {
  name: string;
  subItems: Pick<NavigationItem, "name" | "href">[];
}

const SubMenu: React.FC<SubMenuProps> = ({ name, subItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={classNames([
          "text-gray-300 hover:bg-gray-700 hover:text-white",
          "rounded-md px-3 py-2 text-sm font-medium cursor-pointer uppercase",
        ])}
      >
        {name}
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-1 rounded-md shadow-lg bg-white">
          <div className="py-1">
            {subItems.map((subItem) => (
              <Link
                key={subItem.name}
                href={subItem.href || "#"}
                className={classNames([
                  "hover:bg-gray-100",
                  "block px-4 py-2 text-sm text-gray-700",
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
