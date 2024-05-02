import { ChangeEvent } from "react";

interface SelectFieldProps {
  name?: string;
  isFieldsDisabled: boolean;
  value: string;
  values: string[];
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export const SelectField = ({
  name,
  value,
  values,
  isFieldsDisabled,
  onChange,
  ...props
}: SelectFieldProps) => (
  <>
    {isFieldsDisabled ? (
      <span>&nbsp;{value}</span>
    ) : (
      <select
        {...props}
        className="input-field"
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
