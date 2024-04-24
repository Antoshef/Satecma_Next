import Image from "next/image";
import { useState, useRef } from "react";

const satecma =
  "https://satecma.bg/wp-content/uploads/2024/04/favico-transparent.png";
const eko =
  "https://satecma.bg/wp-content/uploads/2024/04/eco-home-group-logo-scaled.jpg";

export const CompanySelectField = () => {
  const [selectedCompany, setSelectedCompany] = useState(satecma);
  const selectRef = useRef<HTMLSelectElement>(null);

  // Function to trigger select box
  const handleClickLogo = () => {
    selectRef.current?.click();
  };

  return (
    <div id="company-select" style={{ position: "relative" }}>
      <Image
        width={40}
        height={40}
        alt={`${selectedCompany}-logo`}
        src={selectedCompany}
        onClick={handleClickLogo}
        style={{ cursor: "pointer" }}
      />
      <select
        ref={selectRef}
        value={selectedCompany}
        onChange={(e) => setSelectedCompany(e.target.value)}
        style={{
          opacity: 0,
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          cursor: "pointer",
          paddingTop: 40,
        }}
      >
        <option value={satecma}>Satecma</option>
        <option value={eko}>Eko</option>
      </select>
    </div>
  );
};
