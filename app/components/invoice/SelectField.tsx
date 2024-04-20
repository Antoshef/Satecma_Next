import { ChangeEvent } from "react";

interface SelectFieldProps {
  isFieldsDisabled: boolean;
  value: string;
  values: string[];
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export const SelectField = ({
  value,
  values,
  isFieldsDisabled,
  onChange,
}: SelectFieldProps) => (
  <>
    {isFieldsDisabled ? (
      <span>&nbsp;{value}</span>
    ) : (
      <select value={value} onChange={onChange}>
        {values.map((v) => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}
      </select>
    )}
  </>
);
