import { ChangeEvent } from "react";
import "./styles.css";

interface TextFieldProps {
  isFieldsDisabled: boolean;
  type: string;
  placeholder?: string;
  value: string | number;
  name: string;
  smallField?: boolean;
  maxLength?: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const TextField = ({
  value,
  name,
  type,
  placeholder,
  isFieldsDisabled,
  smallField,
  maxLength,
  onChange,
  ...props
}: TextFieldProps) => (
  <>
    {isFieldsDisabled ? (
      value
    ) : (
      <input
        {...props}
        className={smallField ? "small-field" : ""}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        maxLength={maxLength}
        onChange={onChange}
      />
    )}
  </>
);
