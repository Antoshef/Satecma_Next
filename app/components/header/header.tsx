"use client";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Grid, Select } from "@mui/material";
import "./styles.css";
import { CompanySelectField } from "../companySelectField/CompanySelectField";

const tabsMap = {
  "/store": 0,
  "/invoice": 1,
  "/spedition": 2,
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
    setValue(tabsMap[value as keyof typeof tabsMap] || 0);
    router.push(value);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setValue(tabsMap[window.location.pathname as keyof typeof tabsMap] || 0);
    }
  }, []);

  return (
    <Grid container sx={{ width: "100%" }}>
      <Grid component="div" item style={{ flexGrow: 1 }} />
      <Tabs value={value} aria-label="nav tabs" role="navigation" centered>
        <LinkTab label="Склад" href="/store" onClick={handleChange} />
        <LinkTab label="Фактури" href="/invoice" onClick={handleChange} />
        <LinkTab label="Логистика" href="/spedition" onClick={handleChange} />
      </Tabs>
      <Grid component="div" item className="header__company">
        <CompanySelectField />
      </Grid>
    </Grid>
  );
}
