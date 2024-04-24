import { ChangeEvent } from "react";
import "./styles.css";

interface TextFieldProps {
  isFieldsDisabled: boolean;
  type: string;
  placeholder?: string;
  value: string | number;
  name: string;
  smallField?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const TextField = ({
  value,
  name,
  type,
  placeholder,
  isFieldsDisabled,
  smallField,
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
        onChange={onChange}
      />
    )}
  </>
);
