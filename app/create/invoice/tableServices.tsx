import { Button } from "@/components/button/Button";
import { Item } from "./types";
import { TextField } from "@/components/textField/TextField";
import { SelectField } from "@/components/selectField/SelectField";

interface TableServicesProps {
  services: Item[];
  isFieldsDisabled: boolean;
  serviceChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  serviceSelectHandler: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  removeItem: (code: string | number | null) => void;
}

export const TableServices = ({
  services,
  isFieldsDisabled,
  serviceChangeHandler,
  serviceSelectHandler,
  removeItem,
}: TableServicesProps) => {
  return services.map(
    ({ name, code, discount, quantity, price, totalPrice, unit }) => (
      <tr className="service" key={code}>
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
          />
          {` ${unit}`}
        </td>
        <td></td>
        <td>
          <input
            type="text"
            name="price"
            value={price}
            data-code={code}
            className="input-field max-w-16"
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
          />{" "}
        </td>
        <td>
          <SelectField
            data-code={code}
            isFieldsDisabled={isFieldsDisabled}
            value="20"
            values={["20"]}
            onChange={serviceSelectHandler}
          />
        </td>
        <td>{totalPrice} лв.</td>
      </tr>
    )
  );
};
