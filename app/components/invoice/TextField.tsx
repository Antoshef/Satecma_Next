import { ChangeEvent } from "react";

interface TextFieldProps {
  isFieldsDisabled: boolean;
  type: string;
  placeholder: string;
  value: string;
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const TextField = ({
  value,
  name,
  type,
  placeholder,
  isFieldsDisabled,
  onChange,
}: TextFieldProps) => (
  <>
    {isFieldsDisabled ? (
      value
    ) : (
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    )}
  </>
);
