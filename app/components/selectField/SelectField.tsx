import { ChangeEvent } from "react";
import { classNames } from "../header";

interface SelectFieldProps {
  name?: string;
  isFieldsDisabled: boolean;
  value: string;
  values: string[];
  className?: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export const SelectField = ({
  name,
  value,
  values,
  className,
  isFieldsDisabled,
  onChange,
  ...props
}: SelectFieldProps) => (
  <>
    {isFieldsDisabled ? (
      <span className={className}>{value}</span>
    ) : (
      <select
        {...props}
        className={classNames(["input-field", className ? className : ""])}
        name={name}
        value={value}
        onChange={onChange}
      >
        {values.map((v) => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}
      </select>
    )}
  </>
);
