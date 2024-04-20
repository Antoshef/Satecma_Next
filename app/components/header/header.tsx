"use client";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const tabsMap = {
  "/store": 0,
  "/invoice": 1,
};

interface LinkTabProps {
  label?: string;
  href: string;
  selected?: boolean;
  onClick: (href: string) => void;
}

function LinkTab({ href, selected, onClick, ...props }: LinkTabProps) {
  return (
    <Tab
      href={href}
      component={Link}
      aria-current={selected && "page"}
      onClick={() => onClick(href)}
      {...props}
    />
  );
}

export function Header() {
  const router = useRouter();
  const [value, setValue] = useState(0);

  const handleChange = (value: string) => {
    router.push(value);
    setValue(tabsMap[value as keyof typeof tabsMap] || 0);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs value={value} aria-label="nav tabs" role="navigation" centered>
        <LinkTab label="Store" href="/store" onClick={handleChange} />
        <LinkTab
          label="Create Invoice"
          href="/invoice"
          onClick={handleChange}
        />
      </Tabs>
    </Box>
  );
}
