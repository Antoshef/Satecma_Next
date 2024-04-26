import Image from "next/image";
import { useContext, useRef } from "react";
import { Company } from "../../invoice/invoiceBox/constants";
import { CompanyContext } from "../providers/companyProvider";

const satecma =
  "https://satecma.bg/wp-content/uploads/2024/04/favico-transparent.png";
const eko =
  "https://satecma.bg/wp-content/uploads/2024/04/eco-home-group-logo-square.png";

export const CompanySelectField = () => {
  const { company, setCompany } = useContext(CompanyContext);
  const selectRef = useRef<HTMLSelectElement>(null);

  // Function to trigger select box
  const handleClickLogo = () => {
    selectRef.current?.click();
  };

  const changeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCompany(e.target.value as Company);
    localStorage.setItem("company", JSON.stringify(e.target.value));
  };

  return (
    <div id="company-select" style={{ position: "relative" }}>
      <Image
        width={40}
        height={40}
        alt={`${company}-logo`}
        src={company === Company.satecma ? satecma : eko}
        onClick={handleClickLogo}
        style={{ cursor: "pointer" }}
      />
      <select
        ref={selectRef}
        value={company}
        onChange={changeHandler}
        style={{
          opacity: 0,
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          cursor: "pointer",
          paddingTop: 150,
        }}
      >
        <option value={Company.satecma}>Satecma</option>
        <option value={Company.ekoHome}>Eko Home</option>
      </select>
    </div>
  );
};
