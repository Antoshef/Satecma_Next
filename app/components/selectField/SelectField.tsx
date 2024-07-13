import { ChangeEvent } from "react";
import { classNames } from "../header";

interface SelectFieldProps {
  name?: string;
  isFieldsDisabled: boolean;
  value: string;
  values: string[];
  displayValues?: string[];
  className?: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export const SelectField = ({
  name,
  value,
  values,
  displayValues,
  className,
  isFieldsDisabled,
  onChange,
  ...props
}: SelectFieldProps) => (
  <>
    {isFieldsDisabled ? (
      <span className={className}>
        {displayValues ? displayValues[values.indexOf(value)] : value}
      </span>
    ) : (
      <select
        {...props}
        className={classNames(["input-field", className ? className : ""])}
        name={name}
        value={value}
        onChange={onChange}
      >
        {values.map((v, i) => (
          <option key={v} value={v}>
            {displayValues ? displayValues[i] : v}
          </option>
        ))}
      </select>
    )}
  </>
);
