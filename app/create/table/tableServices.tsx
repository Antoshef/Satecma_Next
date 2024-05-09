import { Button } from "@/components/button/Button";
import { SelectField } from "@/components/selectField/SelectField";
import { TextField } from "@/components/textField/TextField";
import { Item } from "../invoice/types";
import { useState } from "react";

interface TableServicesProps {
  services: Item[];
  isFieldsDisabled: boolean;
  className?: string;
  serviceChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  serviceSelectHandler: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  removeItem: (code: string | number | null) => void;
}

export const TableServices = ({
  services,
  isFieldsDisabled,
  className,
  serviceChangeHandler,
  serviceSelectHandler,
  removeItem,
}: TableServicesProps) => {
  const [unit, setUnit] = useState<{ code: string; unit: string }[]>([]);

  const unitChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (unit.find((u) => u.code === event.target.dataset.code)) {
      setUnit((prev) =>
        prev.map((u) =>
          u.code === event.target.dataset.code
            ? { code: u.code, unit: event.target.value }
            : u
        )
      );
      return;
    } else {
      setUnit((prev) => [
        ...prev,
        { code: event.target.dataset.code || "", unit: event.target.value },
      ]);
    }
  };

  return services.map(
    ({ name, code, discount, quantity, price, totalPrice }) => (
      <tr className={className} key={code}>
        <td>
          <Button
            isFieldsDisabled={isFieldsDisabled}
            value={code}
            onClick={removeItem}
          />
        </td>
        <td>
          <TextField
            type="text"
            name="name"
            value={name}
            data-code={code}
            isFieldsDisabled={isFieldsDisabled}
            onChange={serviceChangeHandler}
          />{" "}
        </td>
        <td>
          <TextField
            smallField
            type="number"
            name="quantity"
            value={quantity}
            data-code={code}
            isFieldsDisabled={isFieldsDisabled}
            onChange={serviceChangeHandler}
          />{" "}
          <SelectField
            data-code={code}
            isFieldsDisabled={isFieldsDisabled}
            value={unit.find((u) => u.code === code)?.unit || "бр."}
            values={["бр.", "кг.", "л.", "л.м", "м2"]}
            onChange={unitChangeHandler}
          />
        </td>
        <td></td>
        <td>
          <TextField
            type="number"
            name="price"
            value={price}
            data-code={code}
            className="input-field max-w-16"
            isFieldsDisabled={isFieldsDisabled}
            onChange={serviceChangeHandler}
          />
          {" лв. "}
        </td>
        <td>
          <TextField
            smallField
            type="number"
            name="discount"
            value={discount}
            data-code={code}
            isFieldsDisabled={isFieldsDisabled}
            onChange={serviceChangeHandler}
          />
          {" %"}
        </td>
        <td>
          <SelectField
            data-code={code}
            isFieldsDisabled={isFieldsDisabled}
            value="20"
            values={["20"]}
            onChange={serviceSelectHandler}
          />
          {" %"}
        </td>
        <td>{totalPrice} лв.</td>
      </tr>
    )
  );
};
